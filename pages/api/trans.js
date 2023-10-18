import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
export default async function handler(req, res) {
  const client = await clientPromise;
  //const col_name='for_test'
  const col_name='trans'
  const db = client.db("TransLateDB");
  //const db = client.db("Owais");
  //console.log('>>> ',JSON.parse(req.body))
  let bodyObject;
  switch (req.method) {
    case "POST":
      //console.log("Hello POST",typeof req.body) 
      //bodyObject = JSON.parse(req.body);
      bodyObject=req.body
      switch (bodyObject.type) {
        case 'ADD_SENCE':
          // console.log('ADD_SENCE>>>',bodyObject)
          let myPost = await db.collection(col_name).insertOne(bodyObject.sence);
          res.json(myPost)
          return;
        case 'DEL_SENCE':
          //console.log("Hello DELETE", req.body) 
          let status = await db.collection(col_name).deleteOne( {_id:new ObjectId(bodyObject.id)});
          //console.log(status)
          res.json(status)
          return
      }
      res.json("Not Posted")
      break;
    case "GET":
      const allPosts = await db.collection(col_name)
        .aggregate([{ "$sample": { "size": 3 } }])
        .toArray();
      res.json({ status: 200, data: allPosts });
      break;
    case "PATCH":
      bodyObject = JSON.parse(req.body);
      //console.log("Hello Update",bodyObject1)
      let myUpdate = await db.collection(col_name).updateOne(
        { _id:new ObjectId(bodyObject.id) },
        {
          $set: bodyObject.newData,
           $currentDate: { lastModified: true }
        }
      );
      res.json(myUpdate)
      return;     
  }
}

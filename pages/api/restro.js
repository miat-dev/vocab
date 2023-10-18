import clientPromise from "@/lib/mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("sample_restaurants");
  switch (req.method) {
    case "POST":
       let bodyObject = JSON.parse(req.body);
       // res.json(myPost.ops[0]);
       switch(bodyObject.type){
         case 'ADD_SENCE':
          // console.log('ADD_SENCE>>>',bodyObject)
          let myPost = await db.collection("trans").insertOne(bodyObject.sence);
          res.json(myPost)
          return;
      }
      res.json("Not Posted")
      break;
      case "GET":
        const restaurant = await db
        .collection("restaurants")
        .aggregate([ { "$sample": { "size": 3 } }])
        .toArray();
      res.json({ status: 200, data: restaurant });
      break;
  }
}

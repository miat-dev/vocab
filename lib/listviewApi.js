import clientPromise from "./mongodb.js";

export default async function TransApi(req, res) {
  const client = await clientPromise;
  //console.log('Hello',client)
  const db = client.db("TransLateDB");
  const col_name='trans'
  switch (req.method) {
    case "POST":
      let bodyObject = JSON.parse(req.body);
      let myPost = await db.collection(col_name).insertOne(bodyObject);
      res.json(myPost.ops[0]);
      break;
    case "GET":
      const allPosts = await db.collection(col_name)

      .find({})
   
      .limit(4)
      .toArray();
      res.json({ status: 200, data: allPosts });
      break;
  }
}
// ;(async ()=>{
//   await init()
// })()
import Head from 'next/head'
//import { InferGetServerSidePropsType } from 'next'
import { useEffect, useState } from 'react';
import Listview from './subps/listview.js'
import Cp from './subps/cp.js'
import styles from '@/styles/index.module.css'
import ContView from './subps/contView.js';

export default function Home() {
  const [restaurant, setRestaurant] = useState([]);
  const getRestro = () => {
    //const client = await clientPromise
    fetch('api/restro', {
      method: 'GET'
    })
      .then(res => res.json())
      .then(data => setRestaurant(data.data))
      .catch(error => console.error(error));
  }
  const trans = [
    {
      id: 123,
      text: 'Hello jklllll',
      newt: 'मो प्रवेज आलम'
    },
    {
      id: 123,
      text: 'Hello jklllll',
      newt: 'मो प्रवेज आलम'
    },
    {
      id: 223,
      text: 'Hello',
      newt: 'मो खुर्शीद आलम'
    },
    {
      id: 123,
      text: 'Hello jklllll',
      newt: 'मो प्रवेज आलम'
    },
    {
      id: 123,
      text: 'Hello jklllll',
      newt: 'मो प्रवेज आलम'
    },
    {
      id: 223,
      text: 'Hello',
      newt: 'मो खुर्शीद आलम'
    },
  ]
  useEffect(() => {
    getRestro()
  }, [])
  useEffect(() => {
    //console.log(restaurant)
  }, [restaurant])
  const [alert, setAlert] = useState({ class: 'danger', text: 'Error' }); //default alert remove
  const alertMe = (text = '', className = 'info') => {
    setAlert({ class: className, text })
    setTimeout(() => {
      setAlert({})
    }, 3000)
  }
  return (
    <>
      <Head>
        <title>Welcome to vocab</title>
        <link rel="icon" href="/favicon.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className='main'>
        <div className={alert.class}>{alert.text}</div>
        <a href="/api/trans">Translation</a>
        {restaurant.length ? (
          <div //style={{ margin: '0 calc(20vw - 100px)'}}
          >
            {/* {JSON.stringify(restaurant[0])} */}
            <h4 className="subtitle">You are connected to MongoDB</h4>
            <Cp alertMe={alertMe} />
            <Listview alertMe={alertMe} />
            <h1 className={styles.title}>Delicious Restaurants</h1>
            <div className={styles.allItem}>
              {
                restaurant.map((item, idx) =>
                  <div key={idx} className={styles.item}>
                    <div className={styles.item_in}>
                      <h3>
                        {item.name}
                      </h3>
                      <div className={styles.seperator}></div>
                      <div><b>{item.cuisine}</b></div>
                      <code>
                        {item.address.building},
                        {item.address.street},
                        {item.address.zipcode}
                      </code>
                    </div>

                  </div>)
              }
            </div>
          </div>
        ) : (
          <h4 className="subtitle">
            You are NOT connected to MongoDB. Check the <code>README.md</code>{' '}
            for instructions.
          </h4>
        )}
        <ContView />
      </main>
      <br />
    </>

  )
}
























// import Head from 'next/head'
// import Image from 'next/image'
// import { Inter } from 'next/font/google'
// import styles from '@/styles/Home.module.css'

// const inter = Inter({ subsets: ['latin'] })

// export default function Home() {

//   return (
//     <>
//       Hello
//       <Listview trans={trans}/>
//       {/* <Image width='300' height='300' src='/favicon.png'alt='Hello World'/> */}
//     </>
//   )
// }

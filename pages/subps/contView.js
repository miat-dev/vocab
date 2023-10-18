import { createElement, useState } from 'react';
import styles from '@/styles/cont.module.css'
import { useRouter } from 'next/router';
export default function ContView() {
    const router=useRouter();
    const contents = [{
        conts: { tag: 'h2', text: 'Welcome to Cont', id: '123' },
        child: [{ conts: { tag: 'h4', text: 'What is cont ', id: '124' } },
        { conts: { id: '125', tag: 'p', text: 'Lorem, Hello ipsum dolor sit amet ipsum dolor sit amet conse consectetur adipisicing elit. Ea, ipsum dolor sit amet conse velit laboriosam error neque nesciunt quos quisquam, tempora sit qui non laudantium, unde aspernatur consequatur. Quam!' } }]
    },
    {
        conts: { tag: 'h2', id: '993', text: 'Welcome to Cont 2' },
        child: [
            { conts: { id: '994', tag: 'h4', text: 'How can we find cont' } },
            { conts: { id: '995', tag: 'p', text: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestias exercitationem totam distinctio ad sint ex! Unde sapiente quasi corrupti? Culpa cum ea rerum temporibus, amet consectetur adipisicing elit. Molestias exercitationem totam distinctio ad sint ex! Unde sapiente quasi corrupti? Culpa cum ea rerum temporibus, laborum odio eligendi itaque earum amet.' } },
            { conts: { id: '996', tag: 'h4', text: 'Where go to get cont' } },
            { conts: { id: '997', tag: 'p', text: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestias exercitationem totam distinctio ad sint ex! Unde sapiente quasi corrupti? Culpa cum ea rerum temporibus, amet consectetur adipisicing elit. Molestias exercitationem totam distinctio ad sint ex! Unde sapiente quasi corrupti? Culpa cum ea rerum temporibus, laborum odio eligendi itaque earum amet.' } }
        ]
    },
    {
        conts: { tag: 'h2', id: '933', text: 'Welcome to Cont 3' },
        child: [{ conts: { id: '934', tag: 'h4', text: 'How can we find cont' } },
        { conts: { id: '935', tag: 'p', text: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestias exercitationem totam distinctio ad sint ex! Unde sapiente quasi corrupti? Culpa cum ea rerum temporibus, laborum odio eligendi itaque earum amet.' } }]
    }
    ]
    const [activeId, setActiveId] = useState('123');
    const handleSetActiveId = (id) => {
        setActiveId(id);
        console.log(router)
        router.push('#'+id)
    }
    return (
        <div className={styles.contWrapper}>
            <div className={styles.cont}>
                <RecView child={contents} active={{ skipp: false, activeId, handleSetActiveId }} />
            </div>
            <div className={styles.contNav}>
                <h4>Page contents outline</h4>
                <div>
                    <RecView child={contents} active={{ skipp: true, activeId, handleSetActiveId }} />
                </div>
            </div>
        </div>)
}
const RecView = ({ child = [], active }) => {

    // console.log(skipp)
    return (
        <>
            {
                child.map((cont, idx) => {
                    return (
                        <div key={idx}>
                            {/* {console.log(cont)} */}
                            <Tags cont={cont.conts} active={active} />
                            <RecView child={cont.child} active={active} />
                        </div>)
                })
            }
        </>
    )
}
const Tags = ({ cont, active }) => {
    // console.log(cont)
    const { tag, text } = cont;
    const { skipp, activeId, handleSetActiveId } = active;
    if (tag === 'p') return skipp ? null : createElement('p', null, text);
    if (skipp) return createElement(
        'h3',
        {
            className: activeId === cont.id ? styles.active : '',
            onClick: () => handleSetActiveId(cont.id)
        },
        text
    );
    return createElement(
        tag,
        {
            id: cont.id,
            onClick: () => handleSetActiveId(cont.id)
        },
        text
    );
    // <p>{text}</p>
}
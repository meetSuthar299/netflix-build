import React, { useEffect, useState } from 'react'
import db from '../firebase';
import { collection, getDocs, addDoc, doc, getDoc } from 'firebase/firestore/lite';
import './PlansScreen.css'
import { useSelector } from 'react-redux';
import { selectuser } from '../features/userSlice';
import { loadStripe } from "@stripe/stripe-js";

function PlansScreen() {
    const [products, setProducts] = useState([]);
    const user = useSelector(selectuser);
    const [docID, setDocID] = useState();
    const [subscription, setSubscription] = useState(null);

    useEffect(() => {
        getDocs(collection(db, "customers", user.uid, "subscriptions")).then((querySnapshot) => {
            querySnapshot.forEach(async (sub) => {
                setSubscription({
                    role: sub.data().role,
                    currentPeriodEnd: sub.data().current_period_end.seconds,
                    currentPeriodStart: sub.data().current_period_start.seconds,
                });
            })
        });
    }, [user.uid]);
    useEffect(() => {
        getDocs(collection(db, 'products')).then((querySnapshot) => {
            const products = {};
            querySnapshot.forEach(async (productDoc) => {
                products[productDoc.id] = productDoc.data();
                const priceSnap = await getDocs(collection(productDoc.ref, "prices"));
                priceSnap.docs.forEach((price) => {
                    products[productDoc.id].prices = {
                        priceId: price.id,
                        priceData: price.data()
                    };
                });
            });
            setProducts(products);
        })
    }, []);

    const loadCheckout = async (priceId) => {
        await addDoc(collection(db, "customers", user.uid, "checkout_sessions"), {
            price: priceId,
            success_url: window.location.origin,
            cancel_url: window.location.origin,
        })
            .then(async (snap) => {
                setDocID(snap.id);
                const docRef = doc(db, `customers`, `${user.uid}`, `checkout_sessions`, `${docID}`);
                const docSnap = (await getDoc(docRef)).data();
                const sessionId = docSnap?.sessionId;
                const stripe = await loadStripe('pk_test_51O2i6sKN7HBR3gDsJB1SjUSvTCtCZpakf3YWvhoCPPwTNh3Ea48Fo8t3EHSkCgLdBTCKNs9qLHPQKBEA2iO0RHoi00N0ammg2m');
                stripe.redirectToCheckout({
                    sessionId: sessionId
                })
            })
        ``

    };
    return (
        <div className='PlannsScreen'>
            <br />
            {subscription && <p>Renewal Date: {new Date(subscription?.currentPeriodEnd * 1000).toLocaleDateString()}</p>}
            {Object.entries(products).map(
                ([productId, productData]) => {
                    const isCurrentPackage = productData.name?.toLowerCase().includes(subscription?.role);
                    return (
                        <div key={productId} className={`${isCurrentPackage && "PlannsScreenPlan--disabled"} PlannsScreenPlan`} >
                            <div className='PlannsScreenInfo'>
                                <h5>{productData.name}</h5>
                                <h6>{productData.description}</h6>
                            </div>
                            <button onClick={() => loadCheckout(productData.prices.priceId)}>{isCurrentPackage ? 'Current Package' : "Subscribe"}</button>
                        </div>
                    );
                }
            )}
        </div>
    );
}

export default PlansScreen;

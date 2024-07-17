import { useEffect, useState } from "react";
import axios from 'axios';

const usePlans = () => {
    const [plans, setPlans] = useState([]);

    useEffect(() => {
        const fetchInternetPlans = async () => {
            try {
                let response = await axios.get('http://localhost:8080/getplans'); 
                setPlans(response.data); 
            } catch (error) {
                console.error('Error fetching plans:', error);
            
            }
        }

        fetchInternetPlans();

    }, []);

    return plans;
}

export default usePlans;

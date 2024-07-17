import { useState } from 'react';
import axios from 'axios';

const useActivatePlan = () => {
  const [activePlan, setActivePlan] = useState(null);
  const [activationStatus, setActivationStatus] = useState(null);

  const handleActivatePlan = async (planId) => {
    try {
      const response = await axios.post('http://localhost:8080/activatePlan', { planId });
      const { activationId, startTime } = response.data;
      setActivePlan({ id: activationId, plan_id: planId, start_time: startTime });
      setActivationStatus('Plan activated successfully');
    } catch (error) {
      console.error('Error activating plan:', error);
      setActivationStatus('Failed to activate plan');
    }
  };

  return { activePlan, activationStatus, handleActivatePlan, setActivePlan }; 
};

export default useActivatePlan;

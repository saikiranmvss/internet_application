import { useState } from 'react';
import axios from 'axios';

const useDeactivatePlan = () => {
  const [activePlan, setActivePlan] = useState(null);
  const [activationStatus, setActivationStatus] = useState(null);

  const handleDeactivatePlan = async () => {
    if (activePlan) {
      try {
        const endTime = new Date().toISOString();
        await axios.post('http://localhost:8080/deactivatePlan', { activationId: activePlan.id, endTime });
        setActivePlan(null);
        setActivationStatus('Plan deactivated successfully');
      } catch (error) {
        console.error('Error deactivating plan:', error);
        setActivationStatus('Failed to deactivate plan');
      }
    } else {
      alert('No plan currently activated');
    }
  };

  return { activePlan, activationStatus, handleDeactivatePlan };
};

export default useDeactivatePlan;

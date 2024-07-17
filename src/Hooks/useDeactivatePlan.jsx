import { useState } from 'react';
import axios from 'axios';

const useDeactivatePlan = (setActivePlan) => {
  const [activationStatus, setActivationStatus] = useState(null);

  const handleDeactivatePlan = async (activePlan) => {
    if (activePlan) {
      try {
        const endTimeResponse = await axios.post('http://localhost:8080/deactivatePlan', { activationId: activePlan.id });
        const { endTime } = endTimeResponse.data; 
        setActivePlan(null);
        setActivationStatus('Plan deactivated successfully');
        console.log('EndTime:', endTime); 
      } catch (error) {
        console.error('Error deactivating plan:', error);
        setActivationStatus('Failed to deactivate plan');
      }
    } else {
      alert('No plan currently activated');
    }
  };

  return { activationStatus, handleDeactivatePlan };
};

export default useDeactivatePlan;

import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import useActivatePlan from '../Hooks/useActivatePlan';
import useDeactivatePlan from '../Hooks/useDeactivatePlan';

const Plans = ({ plans }) => {
  const { activePlan: activateActivePlan, activationStatus: activateActivationStatus, handleActivatePlan } = useActivatePlan();
  const { activePlan: deactivateActivePlan, activationStatus: deactivateActivationStatus, handleDeactivatePlan } = useDeactivatePlan();
  const activePlan = activateActivePlan || deactivateActivePlan;
  const activationStatus = activateActivationStatus || deactivateActivationStatus;

  const getFormattedTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours > 0 ? hours + 'h ' : ''}${minutes}m ${remainingSeconds}s`;
  };

  const calculateTimeUsed = () => {
    if (activePlan && activePlan.start_time) {
      const startTime = new Date(activePlan.start_time).getTime();
      const currentTime = Date.now();
      const timeDifferenceInSeconds = Math.floor((currentTime - startTime) / 1000);
      return getFormattedTime(timeDifferenceInSeconds);
    }
    return '';
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Internet Plans</h2>
      {activationStatus && (
        <div className={`alert ${activationStatus.includes('successfully') ? 'alert-success' : 'alert-danger'}`} role="alert">
          {activationStatus}
        </div>
      )}
      <div className="row justify-content-center">
        {plans.map((plan) => {
          const isActive = activePlan && activePlan.plan_id === plan.id;

          return (
            <div key={plan.id} className="col-md-4 mb-4">
              <div className="card h-100">
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{plan.name}</h5>
                  <p className="card-text">{plan.description}</p>
                  <p className="card-text">Price: ${plan.price} per hour</p>
                  <p className="card-text">Data Limit: {plan.data_limit_mb} MB</p>
                  <div className="mt-auto">
                    {!isActive && (
                      <button
                        className="btn btn-primary mr-2"
                        onClick={() => handleActivatePlan(plan.id)}
                        disabled={activePlan !== null}
                        style={{ position: 'absolute', bottom: '10px', left: '10px' }}
                      >
                        Activate
                      </button>
                    )}
                    {isActive && (
                      <button
                        className="btn btn-danger mr-2"
                        onClick={handleDeactivatePlan}
                        disabled={activePlan === null}
                        style={{ position: 'absolute', bottom: '10px', right: '10px' }}
                      >
                        Deactivate
                      </button>
                    )}
                    {isActive && (
                      <p className="mt-2">Started: {new Date(activePlan.start_time).toLocaleTimeString()}</p>
                    )}
                    {isActive && (
                      <p>Time used: {calculateTimeUsed()}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Plans;

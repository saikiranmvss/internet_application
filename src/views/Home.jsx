import usePlans from "../Hooks/usePlans";
import Plans from "../components/Plans";
import 'bootstrap/dist/css/bootstrap.min.css';
const Home = () =>{

    const plans = usePlans();

    return (
        <div>
            <Plans plans={plans} />
        </div>
    );
    
}

export default Home;
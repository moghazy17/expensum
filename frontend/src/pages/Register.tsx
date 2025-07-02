import { Link } from 'react-router-dom';
import RegisterForm from '../components/RegisterForm';

const Register = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="flex items-center justify-center mb-8">
          <img src="/logo.svg" alt="ExpenSum" className="w-16 h-16" />
          <h1 className="text-3xl font-bold text-foreground ml-4">ExpenSum</h1>
        </div>
        
        <RegisterForm />
        
        <p className="mt-6 text-center">
          Already have an account?{' '}
          <Link to="/login" className="text-primary hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
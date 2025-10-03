import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Redirect: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/overview', { replace: true });
  }, [navigate]);

  return null;
};

export default Redirect;

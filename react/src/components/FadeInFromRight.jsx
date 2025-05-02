import React, { useEffect, useState } from 'react';
import styles from './FadeInFromRight.module.css'; // Assuming the CSS module is defined here

const FadeInFromRight = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger the fade-in effect when the component mounts
    setIsVisible(true);
  }, []);

  return (
    <div className={`${styles.fadeInRight} ${isVisible ? styles.visible : ''}`}>
      {children}
    </div>
  );
};

export default FadeInFromRight;

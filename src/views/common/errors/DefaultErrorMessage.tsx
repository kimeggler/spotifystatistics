import React from 'react';
import { Card, CardBody, Button } from '@heroui/react';
import { motion } from 'framer-motion';

const DefaultErrorMessage: React.FC = () => {
  const handleRefresh = (): void => {
    window.location.reload();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center justify-center min-h-[400px] px-6"
    >
      <Card className="bg-red-500/10 border-red-500/20 max-w-md w-full rounded-3xl shadow-2xl backdrop-blur-md">
        <CardBody className="text-center p-10">
          <div className="w-20 h-20 mx-auto mb-6 bg-red-500/20 rounded-3xl flex items-center justify-center">
            <svg className="w-10 h-10 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.664-.833-2.464 0L4.268 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="text-white text-2xl font-black mb-4">
            Oops! Something went wrong
          </h2>
          <p className="text-white/80 mb-8 leading-relaxed">
            We encountered an unexpected error. Please try refreshing the page or check your connection.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              color="danger"
              variant="bordered"
              onClick={handleRefresh}
              className="border-red-500/30 text-red-300 hover:bg-red-500/10 rounded-2xl px-6 py-3 font-semibold"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Refresh Page
            </Button>
            <Button
              variant="light"
              onClick={() => window.history.back()}
              className="text-white/70 hover:text-white rounded-2xl px-6 py-3 font-medium"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Go Back
            </Button>
          </div>
        </CardBody>
      </Card>
    </motion.div>
  );
};

export default DefaultErrorMessage;
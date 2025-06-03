/**
 * Author: Monayem Hossain Limon
 * GitHub: https://github.com/Limon00001
 * Date: 03 Jun, 2025
 * @copyright 2025 monayem_hossain_limon
 */

// External Imports
import { ArrowLeft, CheckCircle, XCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

// Internal Imports
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { verifyPaymentService } from '@/services';

const PaymentSuccessPage = () => {
  const [verifying, setVerifying] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    const verifyPayment = async () => {
      if (!sessionId) {
        setError('No session ID found');
        setVerifying(false);
        return;
      }

      try {
        setVerifying(true);
        const { data } = await verifyPaymentService(sessionId);

        if (data?.success) {
          // Payment verified successfully
          setTimeout(() => {
            navigate('/courses');
          }, 3000);
        } else {
          setError(data?.message || 'Payment verification failed');
        }
      } catch (error) {
        console.error('Payment verification error:', error);
        setError(
          error?.response?.data?.error?.message ||
            'Payment verification failed',
        );
      } finally {
        setVerifying(false);
      }
    };

    verifyPayment();
  }, [sessionId, navigate]);

  //    Show loading state while verifying
  if (verifying) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="p-8 max-w-md w-full">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
            <h2 className="text-2xl font-semibold text-gray-800">
              Verifying Payment...
            </h2>
            <p className="text-gray-600">
              Please wait while we confirm your enrollment
            </p>
          </div>
        </Card>
      </div>
    );
  }

  //    If there's an error during verification, display the error message
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="p-8 max-w-md w-full">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
              <XCircle className="w-8 h-8 text-red-600" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-800">
              Payment Verification Failed
            </h2>
            <p className="text-red-600">{error}</p>
            <Button
              variant="outline"
              className="flex items-center gap-2"
              onClick={() => navigate('/courses')}
            >
              <ArrowLeft className="w-4 h-4" />
              Return to Courses
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="p-8 max-w-md w-full">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
            <CheckCircle className="w-8 h-8 text-blue-600" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-800">
            Payment Successful!
          </h2>
          <p className="text-gray-600">
            Thank you for enrolling. You will be redirected to your courses
            shortly.
          </p>
          <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-green-500 animate-progress" />
          </div>
        </div>
      </Card>
    </div>
  );
};

// Export
export default PaymentSuccessPage;

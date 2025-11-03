import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Button from '@/components/atoms/Button';
import Card from '@/components/atoms/Card';
import ApperIcon from '@/components/ApperIcon';
import Loading from '@/components/ui/Loading';
import Empty from '@/components/ui/Empty';
import Error from '@/components/ui/Error';
import cartService from '@/services/api/cartService';

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updating, setUpdating] = useState(null);

  useEffect(() => {
    loadCartItems();
  }, []);

const loadCartItems = async () => {
    try {
      setLoading(true);
      setError(null);
      const items = await cartService.getCartItems();
      setCartItems(items);
    } catch (err) {
      setError('Failed to load cart items');
      console.error('Cart loading error:', err);
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (itemId, newQuantity) => {
    if (newQuantity < 1) {
      removeItem(itemId);
      return;
    }

    try {
      setUpdating(itemId);
      await cartService.updateQuantity(itemId, newQuantity);
      setCartItems(prev => 
        prev.map(item => 
          item.Id === itemId 
            ? { ...item, quantity: newQuantity }
            : item
        )
      );
      toast.success('Quantity updated');
    } catch (err) {
      toast.error('Failed to update quantity');
      console.error('Update quantity error:', err);
    } finally {
      setUpdating(null);
    }
  };

const removeItem = async (itemId) => {
    try {
      setUpdating(itemId);
      await cartService.removeItem(itemId);
      setCartItems(prev => prev.filter(item => item.Id !== itemId));
      toast.success('Item removed from cart');
    } catch (err) {
      toast.error('Failed to remove item');
      console.error('Remove item error:', err);
    } finally {
      setUpdating(null);
    }
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const calculateDeliveryFee = () => {
    const subtotal = calculateSubtotal();
    return subtotal > 500 ? 0 : 40; // Free delivery above ₹500
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateDeliveryFee();
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast.warning('Your cart is empty');
      return;
    }
    
    toast.success('Proceeding to checkout...');
    // Navigate to checkout page when implemented
    // navigate('/checkout');
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <Error 
        message={error}
        onRetry={loadCartItems}
      />
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => navigate(-1)}
                className="p-2"
              >
                <ApperIcon name="ArrowLeft" className="w-5 h-5" />
              </Button>
              <h1 className="text-3xl font-display font-bold text-secondary">Your Cart</h1>
            </div>
          </div>

          <Empty 
            title="Your cart is empty"
            subtitle="Looks like you haven't added any items to your cart yet"
            actionLabel="Browse Restaurants"
            onAction={() => navigate('/')}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate(-1)}
              className="p-2"
            >
              <ApperIcon name="ArrowLeft" className="w-5 h-5" />
            </Button>
            <h1 className="text-3xl font-display font-bold text-secondary">Your Cart</h1>
          </div>
          <p className="text-gray-600">
            {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <Card key={item.Id} className="p-6">
                <div className="flex items-start gap-4">
                  {/* Item Image */}
                  <div className="w-20 h-20 rounded-lg bg-gray-200 flex-shrink-0 overflow-hidden">
                    {item.image ? (
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <ApperIcon name="UtensilsCrossed" className="w-8 h-8 text-gray-400" />
                      </div>
                    )}
                  </div>

                  {/* Item Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-secondary text-lg mb-1">{item.name}</h3>
                        <p className="text-gray-600 text-sm">{item.restaurant}</p>
                        {item.description && (
                          <p className="text-gray-500 text-sm mt-1 line-clamp-2">
                            {item.description}
                          </p>
                        )}
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeItem(item.Id)}
                        disabled={updating === item.Id}
                        className="p-2 text-error hover:bg-error/10"
                      >
                        <ApperIcon name="Trash2" className="w-4 h-4" />
                      </Button>
                    </div>

                    <div className="flex items-center justify-between">
                      {/* Quantity Controls */}
                      <div className="flex items-center gap-3">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(item.Id, item.quantity - 1)}
                          disabled={updating === item.Id}
                          className="w-8 h-8 p-0"
                        >
                          <ApperIcon name="Minus" className="w-4 h-4" />
                        </Button>
                        <span className="font-semibold text-lg min-w-[2ch] text-center">
                          {updating === item.Id ? '...' : item.quantity}
                        </span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(item.Id, item.quantity + 1)}
                          disabled={updating === item.Id}
                          className="w-8 h-8 p-0"
                        >
                          <ApperIcon name="Plus" className="w-4 h-4" />
                        </Button>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <p className="font-bold text-lg text-secondary">
                          ₹{(item.price * item.quantity).toFixed(2)}
                        </p>
                        {item.quantity > 1 && (
                          <p className="text-sm text-gray-500">
                            ₹{item.price} each
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-24">
              <h2 className="font-bold text-xl text-secondary mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">₹{calculateSubtotal().toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Delivery Fee</span>
                  <span className="font-semibold">
                    {calculateDeliveryFee() === 0 ? (
                      <span className="text-success">FREE</span>
                    ) : (
                      `₹${calculateDeliveryFee().toFixed(2)}`
                    )}
                  </span>
                </div>

                {calculateSubtotal() > 0 && calculateSubtotal() < 500 && (
                  <div className="bg-accent/10 p-3 rounded-lg">
                    <p className="text-sm text-accent font-medium">
                      Add ₹{(500 - calculateSubtotal()).toFixed(2)} more for free delivery!
                    </p>
                  </div>
                )}
                
                <hr className="border-gray-200" />
                
                <div className="flex justify-between items-center text-lg font-bold">
                  <span className="text-secondary">Total</span>
                  <span className="text-primary">₹{calculateTotal().toFixed(2)}</span>
                </div>
              </div>

              <Button 
                variant="primary" 
                size="lg" 
                onClick={handleCheckout}
                className="w-full font-semibold"
              >
                Proceed to Checkout
              </Button>

              <div className="mt-4 text-center">
                <Link 
                  to="/" 
                  className="text-primary hover:text-primary/80 text-sm font-medium inline-flex items-center gap-1"
                >
                  <ApperIcon name="ArrowLeft" className="w-4 h-4" />
                  Continue Shopping
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
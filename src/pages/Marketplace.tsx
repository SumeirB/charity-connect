
import { Link } from "react-router-dom";
import { ShoppingBag, ArrowLeft, Star, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Marketplace = () => {
  const products = [
    {
      id: 1,
      name: "Handmade Eco-Friendly Tote Bag",
      charity: "Green Future Foundation",
      price: 25,
      originalPrice: 35,
      description: "Beautiful handwoven tote bag made from recycled materials. Perfect for grocery shopping or daily use.",
      image: "/placeholder.svg",
      category: "Accessories",
      rating: 4.8,
      reviews: 24,
      inStock: true,
      cause: "Environmental Conservation"
    },
    {
      id: 2,
      name: "Homemade Strawberry Jam Set",
      charity: "Helping Hands Food Bank",
      price: 18,
      originalPrice: 25,
      description: "Set of 3 delicious homemade jams made by our volunteers. Strawberry, blueberry, and mixed berry.",
      image: "/placeholder.svg",
      category: "Food & Treats",
      rating: 4.9,
      reviews: 31,
      inStock: true,
      cause: "Fighting Hunger"
    },
    {
      id: 3,
      name: "Children's Learn-to-Read Book Bundle",
      charity: "Literacy First",
      price: 32,
      originalPrice: 45,
      description: "Collection of 10 beautifully illustrated children's books designed to help young readers develop their skills.",
      image: "/placeholder.svg",
      category: "Books & Education",
      rating: 4.7,
      reviews: 18,
      inStock: true,
      cause: "Literacy & Education"
    },
    {
      id: 4,
      name: "Pet Care Starter Kit",
      charity: "Paws & Hearts Shelter",
      price: 42,
      originalPrice: 60,
      description: "Everything a new pet owner needs: collar, leash, toys, treats, and care guide. Perfect for new adoptions.",
      image: "/placeholder.svg",
      category: "Pet Supplies",
      rating: 4.9,
      reviews: 27,
      inStock: false,
      cause: "Animal Welfare"
    },
    {
      id: 5,
      name: "Community Garden Herb Kit",
      charity: "Green Future Foundation",
      price: 28,
      originalPrice: 40,
      description: "Grow your own herbs! Kit includes seeds, pots, soil, and growing guide for basil, oregano, and thyme.",
      image: "/placeholder.svg",
      category: "Gardening",
      rating: 4.6,
      reviews: 15,
      inStock: true,
      cause: "Environmental Conservation"
    },
    {
      id: 6,
      name: "Volunteer Appreciation Coffee Blend",
      charity: "Helping Hands Food Bank",
      price: 15,
      originalPrice: 22,
      description: "Special blend coffee roasted locally. Perfect morning fuel for busy volunteers and supporters.",
      image: "/placeholder.svg",
      category: "Food & Treats",
      rating: 4.8,
      reviews: 42,
      inStock: true,
      cause: "Fighting Hunger"
    }
  ];

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      Accessories: "bg-purple-100 text-purple-800",
      "Food & Treats": "bg-orange-100 text-orange-800",
      "Books & Education": "bg-blue-100 text-blue-800",
      "Pet Supplies": "bg-green-100 text-green-800",
      Gardening: "bg-emerald-100 text-emerald-800"
    };
    return colors[category] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Link to="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
            </div>
            <h1 className="text-3xl font-bold text-gray-900">TheMarketPlace</h1>
            <div className="w-24"></div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Shop for a Good Cause
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Every purchase supports local charities and their missions. 
            Find unique, handmade, and meaningful products while making a difference.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <Card key={product.id} className="hover:shadow-lg transition-shadow overflow-hidden">
              <div className="relative">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                {!product.inStock && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <Badge variant="secondary" className="text-white bg-gray-800">
                      Out of Stock
                    </Badge>
                  </div>
                )}
                <Badge className={getCategoryColor(product.category) + " absolute top-2 left-2"}>
                  {product.category}
                </Badge>
              </div>
              
              <CardHeader>
                <CardTitle className="text-lg mb-1">{product.name}</CardTitle>
                <CardDescription className="text-blue-600 font-medium mb-2">
                  {product.charity}
                </CardDescription>
                <div className="flex items-center text-sm text-gray-600">
                  <Star className="h-4 w-4 text-yellow-400 mr-1" />
                  {product.rating} ({product.reviews} reviews)
                </div>
              </CardHeader>
              
              <CardContent>
                <p className="text-gray-700 text-sm mb-4">{product.description}</p>
                
                {/* Cause Impact */}
                <div className="bg-green-50 rounded-lg p-2 mb-4">
                  <p className="text-xs text-green-800">
                    <Heart className="h-3 w-3 inline mr-1" />
                    Supports: {product.cause}
                  </p>
                </div>

                {/* Pricing */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-gray-900">
                      ${product.price}
                    </span>
                    <span className="text-sm text-gray-500 line-through">
                      ${product.originalPrice}
                    </span>
                  </div>
                  <Badge variant="outline" className="text-green-600 border-green-600">
                    ${product.originalPrice - product.price} saved
                  </Badge>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2">
                  <Button 
                    className="w-full bg-purple-600 hover:bg-purple-700" 
                    disabled={!product.inStock}
                  >
                    <ShoppingBag className="h-4 w-4 mr-2" />
                    {product.inStock ? "Add to Cart" : "Out of Stock"}
                  </Button>
                  <Button variant="outline" className="w-full">
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Impact Section */}
        <div className="mt-12 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg p-8">
          <div className="text-center">
            <h3 className="text-3xl font-bold mb-4">Your Purchases Create Real Impact</h3>
            <div className="grid md:grid-cols-3 gap-8 mt-8">
              <div>
                <div className="text-3xl font-bold mb-2">$45,200</div>
                <div className="text-purple-100">Raised Through Sales</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">1,230</div>
                <div className="text-purple-100">Products Sold</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">18</div>
                <div className="text-purple-100">Charities Supported</div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12 bg-white rounded-lg p-8 shadow-sm">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Want to Sell Products for Your Charity?
          </h3>
          <p className="text-gray-600 mb-6">
            Join TheMarketPlace as a charity partner and start selling your products to support your cause.
          </p>
          <Button size="lg" variant="outline">
            Become a Partner
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Marketplace;

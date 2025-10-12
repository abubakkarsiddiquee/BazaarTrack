import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, ActivityIndicator, TouchableOpacity } from 'react-native';

export default function HomeScreen() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      // ⚠️ Replace with your computer’s local IP address (e.g., 192.168.x.x)
      const response = await fetch('http://192.168.x.x:3000/products');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const refreshPrices = async () => {
    setLoading(true);
    await fetch('http://192.168.x.x:3000/scrape'); // triggers backend scraper
    await fetchProducts();
  };

//   app.get("/products", async (req, res) => {
//   const [rows] = await db.query(`
//     SELECT p.id, p.name, p.category, p.unit, p.product_image_url,
//            m.name AS market, pr.price, pr.scraped_date
//     FROM products p
//     JOIN prices pr ON p.id = pr.product_id
//     JOIN markets m ON pr.market_id = m.id
//     WHERE pr.scraped_date = CURDATE()
//   `);
//   res.json(rows);
// });


  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0E7C7B" />
        <Text style={styles.loaderText}>Loading prices...</Text>
      </View>
    );
  }

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image
        source={{ uri: item.product_image_url }}
        style={styles.image}
        resizeMode="contain"
      />
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.market}>{item.market}</Text>
        <Text style={styles.price}>{item.price} ৳</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.refreshButton} onPress={refreshPrices}>
        <Text style={styles.refreshText}>🔄 Update Prices</Text>
      </TouchableOpacity>

      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderText: {
    marginTop: 10,
    color: '#555',
  },
  refreshButton: {
    backgroundColor: '#0E7C7B',
    padding: 12,
    margin: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  refreshText: {
    color: 'white',
    fontWeight: 'bold',
  },
  list: {
    padding: 10,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  info: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'center',
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#222',
  },
  market: {
    color: '#777',
    fontSize: 14,
    marginVertical: 4,
  },
  price: {
    color: '#0E7C7B',
    fontWeight: 'bold',
    fontSize: 15,
  },
});

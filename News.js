import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';

// Sample data
const data = [
  {
    id: '1',
    title: 'Empowering Women Through Safety Education',
    description: 'Read about how education is key to empowering women and preventing harassment.',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTB4AorXfr1xj29CRCgF71bfdkKGVTK3Aa7kg&s',
    source: 'Magazine',
  },
  {
    id: '2',
    title: 'Breaking the Silence: Women\'s Voices',
    description: 'This article explores the importance of sharing experiences to combat harassment.',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSivQZ7O6srkNFnBXMyMHswGei7MJQ7FTI8Nw&s',
    source: 'Article',
  },
  {
    id: '3',
    title: 'Safety Tips for Women on Social Media',
    description: 'Learn effective strategies for staying safe while using social media.',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSSaSdfluxPFb2UOYH83TnjzFpbbqzyBx94w&s',
    source: 'Tweet',
  },
  {
    id: '4',
    title: 'Self-Defense Techniques for Women',
    description: 'Discover self-defense techniques that every woman should know.',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjdbPKLp7V4R2B0-sz4lc2fwoIFEtVS4U7eg&s',
    source: 'Article',
  },
  {
    id: '5',
    title: 'Understanding Consent: A Guide for Women',
    description: 'A comprehensive guide on consent and its importance in relationships.',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPlBk-MvX4vtKJC1_Y-t3yhdphZNfzwe68XA&s',
    source: 'Magazine',
  },
  {
    id: '6',
    title: 'Women’s Rights: A Historical Perspective',
    description: 'Explore the history of women’s rights movements and their impact.',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSj0bE5nDtL_Qi77iR_LWTh9JB6vqq97ubS5A&s',
    source: 'Article',
  },
  {
    id: '7',
    title: 'Online Safety: Protecting Your Privacy',
    description: 'Essential tips for women to protect their privacy online.',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQY32q036Kmy_bN7odS2UeYuWVfDz4Qzo4Llg&s',
    source: 'Tweet',
  },
  {
    id: '8',
    title: 'Mental Health and Women: Breaking the Stigma',
    description: 'Discussing the importance of mental health for women and how to seek help.',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwguXo7Bj2yc29CLwExsl524Mdqf9jIvaCqQ&s',
    source: 'Article',
  },
  {
    id: '9',
    title: 'Creating Safe Spaces for Women',
    description: 'How to create supportive and safe environments for women in communities.',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7r1KF8DJnWeRU3rbKNTBNTdtH4JMfjqI2Jg&s',
    source: 'Magazine',
  },
];

const WomenSafetyArticles = () => {
  const renderItem = ({ item }) => {
    const isSpecialCard = item.id === '2' || item.id === '7';

    return (
      <TouchableOpacity style={isSpecialCard ? styles.specialCard : styles.card}>
        {isSpecialCard ? (
          <>
            <Image source={{ uri: item.imageUrl }} style={styles.specialImage} />
            <View style={styles.specialTextContainer}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.description}>{item.description}</Text>
              <Text style={styles.source}>{item.source}</Text>
            </View>
          </>
        ) : (
          <>
            <View style={styles.imageContainer}>
              <Image source={{ uri: item.imageUrl }} style={styles.image} />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.description}>{item.description}</Text>
              <Text style={styles.source}>{item.source}</Text>
            </View>
          </>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Women's Safety Resources</Text>

      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  specialCard: {
    backgroundColor: '#e1f7fa', // Light cyan background for special cards
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    height: 250, // Set a fixed height for special cards
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 150,
    height: 130,
    borderRadius: 10,
  },
  specialImage: {
    width: '100%',
    height: '50%', // Make the image take half the height of the card
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  specialTextContainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: '50%', // Ensures the text container takes the bottom half of the card
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginVertical: 5,
  },
  source: {
    fontSize: 12,
    color: '#999',
    fontStyle: 'italic',
  },
});

export default WomenSafetyArticles;

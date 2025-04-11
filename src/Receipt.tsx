import React from 'react';
import { View, Text, StyleSheet,TouchableOpacity,FlatList } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';

type ReceiptProps = NativeStackScreenProps<RootStackParamList, 'Receipt'>;
type ListItem = {
  key: string;
  value: string;
};
const Receipt: React.FC<ReceiptProps> = ({ route,navigation }) => {
  const { data } = route.params;
  
  const newHashmap: { [key: string]: any } = {};

  var respdata_new = JSON.parse(JSON.stringify(data));
  // var respdatar ={"PaymentId":"2423310560396803238","TranId":"2423310560396803238","ECI":"02","Result":"Successful","TrackId":"123","AuthCode":"176964","ResponseCode":"000","RRN":"423307176964","responseHash":"c332988230ed809c851101b6831e804d3cd87008459795b3fb0f3bec9c83d6a8","cardBrand":"MASTER","amount":"1.00","UserField1":"","UserField3":"","UserField4":"","UserField5":"","cardToken":"","maskedPAN":"512345XXXXXX0008","email":"","payFor":"","SubscriptionId":"null","PaymentType":"CreditCard","metaData":""}
      Object.keys(respdata_new).forEach(function(key)
      {
          var value = respdata_new[key];
          console.log("new value ",value);  
  
          newHashmap[key] = value;
            
      });
   
     const obj = Object.entries(newHashmap).map(([key, value]) => ({key , value}))
  
      console.log(" OBJ "+obj);

      const renderListItem = ({ item }: { item: ListItem }) => (
        <Text style={styles.txtDetail}>
          {item.key} : {typeof item.value === 'object' ? JSON.stringify(item.value, null, 2) : item.value}
        </Text>
      );
  return (
    <View style={styles.container}>
      
      <Text>Hi</Text>
         
          <FlatList
        data={obj}
        renderItem={renderListItem}
       
      />
  <TouchableOpacity style={styles.btnAction} onPress={() => {
          navigation.navigate('PaymentForm');
      }}>
        <Text style={styles.txtAction}>{"New Transaction"}</Text>
      </TouchableOpacity>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
},
txtHeader: {
    marginTop: 30,
    paddingVertical: 10,
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 14,
},

 // container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
 head: { height: 40, backgroundColor: '#f1f8ff' },
 text: { margin: 6 },

txtDetail: {
 
    flex: 1,
    justifyContent: 'center',
    paddingTop:10,
    backgroundColor: '#ecf0f1',
    padding: 8,
},
btnAction: {
    height: 35,
    borderRadius: 5,
    marginTop: 20,
    marginHorizontal: 50,
    backgroundColor: '#3576be',
    justifyContent: 'center',
    alignSelf: 'stretch',
    alignItems: 'center',
    marginBottom:20,
},
txtAction: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
},
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default Receipt;

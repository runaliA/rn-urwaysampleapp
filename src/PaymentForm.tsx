
import  { useState } from 'react';

import {
  Button,
  SafeAreaView,
 TextInput,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { HostedPlugin, ApplePayComponent } from 'react-native-urwaylib';

import { Dropdown } from 'react-native-element-dropdown';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App'; // Adjust the import path if needed

type PaymentFormProps = NativeStackScreenProps<RootStackParamList, 'PaymentForm'>;

type TransactionType = {
  label: string;
  trxntype: string;
}; 
type TokenType = {
  labeltxt: string;
  tokentype: string;
};

const PaymentForm: React.FC<PaymentFormProps> = ({ navigation }) => {
  //let appReq = "https://www.google.com";
  //const navigation = useNavigation();
  const [trxntype, setTrxnType] = useState<string | null>(null);
  const [tokentype, setTokenType] = useState<string | null>(null);
  const [data,setData] = useState({country:"SA",first_name:"John",last_name:"Deo ",address:"",
    city:"NY",state:"MH",zipcode:"421201",phoneno:"",email:"",responseurl:"",
    trackid:"1001",merchantidentifier:"merchant.sa.urwayphp",
    currency:"SAR",amount:"1.00",cardtoken:"",
    metadata:"{entry1:entry1}",status:"",terminalId:"recterm",transactionId:"",
    password:"password",merchantkey:"4e5b624f798b6f8fa39dd0125ec1f37d3b33b473cdba6bbf03c99f3554caa32d",
    action:"",tokenizationType:"",requestUrl: "https://payments-dev.urway-tech.com/URWAYPGService/transaction/jsonProcess/JSONrequest",store_name:""});
    const [appReq , setAppReq ] = useState("") 
    const [showWebView, setShowWebView] = useState(false);
   const [trigeredApplePay, setTriggeredApplePay] = useState(false);
    const [applePayData, setApplePayData] = useState<any>(null);
   
    // let terminalId = "recterm"
    // let password = "password"
    // let merchantKey = "4e5b624f798b6f8fa39dd0125ec1f37d3b33b473cdba6bbf03c99f3554caa32d"
    // let url = "https://payments-dev.urway-tech.com/URWAYPGService/transaction/jsonProcess/JSONrequest"
    




    const handleButtonClick = () => {
      let  appreq = JSON.stringify(data);
      console.log(" API Request Data  ",appReq);
      setAppReq(appreq);
            
      setShowWebView(!showWebView);
    };

    const transactiontype = [
      { label: 'Purchase', trxntype: '1' },
      { label: 'Pre Auth', trxntype: '4' },
      { label: 'Tokenization', trxntype: '12' },
      { label: 'Void Purchase', trxntype: '3' },
      { label: 'Void Authorization', trxntype: '9' },
      { label: 'Refund', trxntype: '2' },
      { label: 'Void Refund', trxntype: '6' },
      { label: 'Transaction Enquiry', trxntype: '10' },


    ];
    const renderItem = (item: TransactionType) => (
      <Text style={styles.dropdownItem}>{item.label}</Text>
    );
  
  
    
    const tokenizationtype = [
      { labeltxt: 'Add', tokentype: 'A' },
      { labeltxt: 'Update', tokentype: 'U' },
      { labeltxt: 'Delete', tokentype: 'D' },
        ];
        const renderTokenItem = (item: TokenType) => (
          <Text style={styles.dropdownItem}>{item.labeltxt}</Text>
        );

 
        const initiateApplePay = () => {
          setTriggeredApplePay(true);
          setApplePayData({
            amount: data.amount,
            currency: data.currency,
            merchantIdentifier: data.merchantidentifier,
            countryCode: data.country,
            merchantCapabilities: ['supports3DS'],
            supportedNetworks: ['visa', 'mastercard'],
            paymentSummaryItems: [
              {
                label: 'Total',
                amount: data.amount,
              },
            ],
          });
        };

        const handlePaymentResult = (result: any) => {
          console.log("Payment result from HostedPlugin: ", result);
          setShowWebView(false);
  navigation.navigate('Receipt',{
    data:(JSON.parse(result))
          });
          // Handle the payment result (e.g., update UI, navigate, etc.)
        };
const handleApplePayResponse
  = (result: any) => {
    console.log("Payment result from ApplePayComponent: ", result);
    setTriggeredApplePay(false);
    navigation.navigate('Receipt',{
      data:(JSON.parse(result))
    });
    // Handle the payment result (e.g., update UI, navigate, etc.)
  };

return (
  <SafeAreaView style={styles.container}>
    <KeyboardAwareScrollView
          extraHeight={100}>
      
      <View style={styles.viewPanel}>
        <View style={styles.viewHeader}>
            <Text style={styles.txtHeader}>{"Shipping Details"}</Text>
        </View>
          <View style={styles.viewContent}>
          <View style={styles.viewField}>
            <Text style={styles.lblField}>{"Country:"}
            <Text style={{ color: 'red' }}>{"*"}</Text>
            </Text>
            <TextInput
              style={styles.input} 
              id="country"
              
              
              placeholder="Country"
              onChangeText={newText => setData({...data,country:newText})}
              defaultValue={data.country}/>
          </View>
          <View style={styles.viewField}>
          <Text style={styles.lblField}>{"First Name:"}</Text>
          <TextInput
            style={styles.input} 
            id="first_name"
            placeholder="First Name"
            onChangeText={newText => setData({...data,first_name:newText})}
            defaultValue={data.first_name}
          />
       </View>
       <View style={styles.viewField}>
          <Text style={styles.lblField}>{"Last Name:"}</Text>
          <TextInput
            style={styles.input} 
            id="last_name"
            placeholder="Last Name"
            onChangeText={newText => setData({...data,last_name:newText})}
            defaultValue={data.last_name}
          />
        </View>
        <View style={styles.viewField}>
         <Text style={styles.lblField}>{"Address:"}
           {/* <Text style={{ color: 'red' }}>{"*"}</Text> */}
            </Text>
         <TextInput
          style={styles.input} 
          id="address"
          placeholder="Address"
          onChangeText={newText => setData({...data,address:newText})}
          defaultValue={data.address}
        />
         </View>
         <View style={styles.viewField}>
          <Text style={styles.lblField}>{"City:"}
           {/* <Text style={{ color: 'red' }}>{"*"}</Text> */}
          </Text>
        <TextInput
          style={styles.input} 
          id="city"
          placeholder="City"
          onChangeText={newText => setData({...data,city:newText})}
          defaultValue={data.city}
        />  
        </View> 
        <View style={styles.viewField}>
        <Text style={styles.lblField}>{"State:"}
          {/* <Text style={{ color: 'red' }}>{"*"}</Text> */}
        </Text>
      <TextInput
        style={styles.input} 
        id="state"
        placeholder="State"
        onChangeText={newText => setData({...data,state:newText})}
        defaultValue={data.state}
      />
      </View>       
        <View style={styles.viewField}>
        <Text style={styles.lblField}>{"Zip/Postal Code:"}
        {/* <Text style={{ color: 'red' }}>{"*"}</Text> */}
       </Text>
      <TextInput
        style={styles.input} 
        id="zipcode"
        placeholder="Zip/Postal code"
        onChangeText={newText => setData({...data,zipcode:newText})}
        defaultValue={data.zipcode}
      />                          
    </View>
  
   <View style={styles.viewField}>
    <Text style={styles.lblField}>{"Email Address:"}
    <Text style={{ color: 'red' }}>{"*"}</Text>
    </Text>
    <TextInput
        style={styles.input} 
        id="email"
        placeholder="Email Address"
        onChangeText={newText => setData({...data,email:newText})}
        defaultValue={data.email}
      />                         
   </View>
 
   

        </View>
      </View>
      <View style={styles.viewPanel}>
          <View style={styles.viewHeader}>
            <Text style={styles.txtHeader}>{"Order Details"}</Text>
          </View>
          <View style={styles.viewContent}>
            <View style={styles.viewField}>
                <Text style={styles.lblField}>{"Order ID/Track ID:"}
                <Text style={{ color: 'red' }}>{"*"}</Text>
                </Text>
        <TextInput
        style={styles.input} 
        id="trackid"
        
        placeholder="TrackId"
        onChangeText={newText => setData({...data,trackid:newText})}
        defaultValue={data.trackid}
      />
      </View>
      <View style={styles.viewField}>
      <Text style={styles.lblField}>{"Merchant ID:(For Apple Pay Transaction)"}</Text>
      <TextInput
        style={styles.input} 
        id="merchantidentifier"
        placeholder="Merchant Id"
       
        onChangeText={newText => setData({...data,merchantidentifier:newText})}
        defaultValue={data.merchantidentifier}
      />                          
   </View>
   <View style={styles.viewField}>
      <Text style={styles.lblField}>{"Currency:"}
        <Text style={{ color: 'red' }}>{"*"}</Text>
      </Text>
      <TextInput
        style={styles.input} 
        id="currency"
      
        placeholder="Currency"
        onChangeText={newText => setData({...data,currency:newText})}
        defaultValue={data.currency}
      />
    </View>

    <View style={styles.viewField}>
      <Text style={styles.lblField}>{"Transaction ID:"}
        
      </Text>
      <TextInput
        style={styles.input} 
        id="transactionId"
      
        placeholder="Transaction ID"
        onChangeText={newText => setData({...data,transactionId:newText})}
        defaultValue={data.transactionId}
      />
    </View>

    <View style={styles.viewField}>
     <Text style={styles.lblField}>{"Amount:"}
      <Text style={{ color: 'red' }}>{"*"}</Text>
      </Text>
     <TextInput 
        style={styles.input} 
        id="amount"
      
        placeholder="Amount"
        keyboardType={'decimal-pad'}
        onChangeText={newText => setData({
        //  var items = newText.split(".");
        //  let value = items[0];
        //  if (items.length > 1) {
        //   value += "." + items[1].substring(0, 2);
        //  }
          ...data,amount:newText})}
        defaultValue={data.amount}
      />                             
                                
    </View>
    <View style={styles.viewField}>
    <Text style={styles.lblField}>
        Action: <Text style={{ color: 'red' }}>*</Text>
      </Text>
      <Dropdown
        style={styles.dropdown}
        data={transactiontype}
        selectedTextStyle={styles.selectedTextStyle}
        labelField="label"
        valueField="trxntype"
        placeholder="Select item"
        value={trxntype}
        onChange={(item: TransactionType) => {
          setTrxnType(item.trxntype);
          setData({ ...data, action : item.trxntype });
        }}
        renderItem={renderItem}
      />
        
        
   </View>
   <View style={styles.viewField}>
     <Text style={styles.lblField}>{"Tokenization:"}</Text>
    <Dropdown
        style={styles.dropdown}
        data={tokenizationtype}
        selectedTextStyle={styles.selectedTextStyle}
        labelField="labeltxt"
        valueField="tokentype"
        placeholder="Select item"
        value={tokentype}
        onChange={(item: TokenType) => {
          setTokenType(item.tokentype);
          setData({ ...data, tokenizationType : item.tokentype });
        }}
        renderItem={ renderTokenItem }
      />                          
   </View>
   
   <View style={styles.viewField}>
     <Text style={styles.lblField}>{ "Card Token:" }</Text>
      <TextInput
        style={styles.input} 
        id="cardtoken"
        placeholder="Card Token"
        onChangeText={newText => setData({...data,cardtoken:newText})}
        defaultValue={data.cardtoken}
      />
   </View>
   <View style={styles.viewField}>
     <Text style={styles.lblField}>{"MetaData Json Parameter:"}</Text>
     <TextInput
        style={styles.input} 
        id="metadata"
        placeholder="MetaData Json Parameter"
        onChangeText={newText => setData({...data,metadata:newText})}
        defaultValue={data.metadata}
      />
   </View>
   {/* <View style={styles.viewField}>
      <Text style={styles.lblField}>{"Customer Present:"}</Text>
    
    </View> */}


      </View>
      </View>
      {!showWebView && (
       <Button
    title={'Pay'}
    onPress={() => handleButtonClick()  }
    
  /> )}
  
   


<View style={styles.btnContainer}>
      <Button title="Pay with Apple Pay" onPress={initiateApplePay} />
      {trigeredApplePay && (
        <ApplePayComponent data={applePayData} onClose={handleApplePayResponse} />
      )}
    </View>
      </KeyboardAwareScrollView>
     
      {showWebView && (
    <View style = {styles.webViewContainer}>
     <HostedPlugin data={ appReq } onClose={ handlePaymentResult} />
    </View>

  )} 
</SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
   margin: 20,
  
  },
  input: {
    flex: 1,
    height: 35,
    fontSize: 12,
    fontWeight: 'normal',
    alignSelf: 'stretch',
    paddingHorizontal: 10,
    paddingVertical: 0,
    borderColor: 'gray',
    borderRadius: 3,
    borderWidth: 1,
  },
  
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'grey',
  },


    placeholderStyle: {
      fontSize: 12,
    },
    selectedTextStyle: {
      fontSize: 12,
    },
    label: {
      fontSize: 16,
      marginBottom: 10,
    },
    textStyle: {
      fontSize: 16,
      color: '#333',
    },

    dropdown: {
      padding: 10,
      borderWidth: 1,
      borderRadius: 5,
      borderColor: '#333',
    },
    dropdownText: {
      fontSize: 16,
    },
    dropdownMenu: {
      width: '80%',
    },
    row: {
      padding: 10,
    },
    rowText: {
      fontSize: 16,
      color: '#000',
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
    },
    viewPanel: {
     borderWidth: 1,
      borderRadius: 5,
      borderColor: '#cae9ef',
   
      marginVertical: 10,
      paddingBottom: 15,
  },
  viewHeader: {
      height: 40,
      justifyContent: 'center',
      alignItems: 'flex-start',
      paddingHorizontal: 12,
      backgroundColor: '#cfe6f0',
      borderBottomColor: '#cae9ef',
      borderBottomWidth: 1,
  },
  txtHeader: {
      fontSize: 14,
      color: '#5d82c1',
  },
  viewContent: {
      flex: 1,
      paddingHorizontal: 15,
  },
  viewField: {
      paddingTop: 10,
      alignSelf: 'stretch',
  },lblField: {
      fontSize: 13,
      color: 'gray',
      fontWeight: '600',
      paddingVertical: 3,
  },
  btnAction: {
    height: 35,
    borderRadius: 5,
    marginTop: 5,
    marginBottom: 10,
    marginHorizontal: 30,
    backgroundColor: '#3576be',
    justifyContent: 'center',
    alignSelf: 'stretch',
    alignItems: 'center',
},
txtAction: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
},
containerweb: {
  flex: 1
  
},
paragraphweb: {
  margin: 24,
  fontSize: 18,
  fontWeight: 'bold',
  textAlign: 'center',
},
webViewContainer: 
{
  
  width: '100%',
  height: '100%',
},


btnContainer:
 {
  justifyContent : 'center',
  alignContent : 'center'
 }, 
 result: {
  marginTop: 20,
  fontSize: 16,
  color: '#555',
},




dropdownItem: {
  padding: 10,
  fontSize: 14,
},
    
});


export default PaymentForm;

import React from 'react';
import { StyleSheet, Text, View , TextInput,TouchableOpacity } from 'react-native';

export default class App extends React.Component{

  constructor(){
    super();
    this.state = {
      text : '',
      isSearchPressed:false,
      word:"Loading",
      lexicalCategory:'',
      examples:[],
      definition:"",
    }
  }

  getWord = (word) => {
    var searchWord = word.toLowerCase();
    var url = "https://rupinwhitehatjr.github.io/dictionary/" + searchWord + ".json";
    return fetch(url)
    .then((data) => {
      if(data.status === 200)
        return data.json();
      else
        return null;
    })
    .then((response) => {
      console.log(response);

      var responseValue = response;

      if(responseValue){

        var definition = responseValue.definitions[0].description;
        var lexicalcategory = responseValue.definitions[0].description;

        this.setState({
          word:this.state.text,
          definition:definition,
          lexicalCategory:lexicalcategory,
        })
      }

      else{
        this.setState({
          word:"Loading",
          definition:"Not Found",
        })
      }
    })
  }


  render(){
    return (
      <View>
        <TextInput style = {styles.textinput}
          onChangeText = {(text) => {
            this.setState({
              text:text,
              isSearchPressed:false,
              word:"Loading",
              lexicalCategory:"",
              examples:[],
              definition: "",
            })
          }}
          value = {this.state.text}>
        </TextInput>

        <TouchableOpacity
          style = {styles.searchButton}
          onPress = {() => {
            this.setState({isSearchPressed:true});
            this.getWord(this.state.text);
          }}>
            <Text style = {styles.searchtext}>SEARCH</Text>
        </TouchableOpacity>


        <View>
          <Text style = {[styles.detailstitle,{fontSize:20,textAlign:'center'}]}>
            {
              this.state.isSearchPressed && this.state.word === "Loading"
              ? this.state.word
              : ""
            }
          </Text>
            {
              this.state.word !== "Loading" ? 
              (
                <View style = {{marginLeft:10,justifyContent: 'center'}}>
                  <View style = {styles.detailsContainer}>
                    <Text style = {[styles.detailstitle,{fontSize : 18}]}>
                      Word : {this.state.word}
                    </Text>
                  </View>
                  <View style = {styles.detailsContainer}>
                    <Text style = {styles.detailstitle}>
                      Type : {this.state.lexicalCategory}
                    </Text>
                  </View>
                  <View style = {styles.detailsContainer}>
                    <Text style = {styles.detailstitle}>
                      Definiton : {this.state.definition}
                    </Text>
                  </View>
                </View>
              )
              : null
            }
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textinput : {
    marginTop:350,
    backgroundColor:'red',
    borderWidth:5,
    borderRadius:8,
    width:300,
    height:50,
    alignItems:'center',
    alignSelf:'center',
    justifyContent:'center',
    textAlign:'center',
  },
  searchButton : {
    marginTop:35,
    backgroundColor:'yellow',
    borderWidth:5,
    borderRadius:30,
    width:150,
    height:60,
    alignItems:'center',
    alignSelf:'center',
    justifyContent:'center',
    borderColor:'green',
  },
  searchtext : {
    textAlign:'center',
    fontSize:25,
    fontWeight:'bold',
    color:'purple'
  },
  outputContainer : {
    flex : 0.7,
    alignItems:'center',
  },
  detailsContainer: {
    flexDirection:'row',
    alignItems:'center'
  },
  detailstitle : {
    color:'orange',
    fontSize:20,
    fontWeight:'bold'
  },
  
})


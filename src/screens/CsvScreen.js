/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  PermissionsAndroid,
} from 'react-native';
import {writeFile, readFile, DownloadDirectoryPath} from 'react-native-fs';
import XLSX from 'xlsx';

const CsvScreen = () => {
  const createCSV = () => {
    let sample_data_to_export = [
      {
        id: '1',
        contentName: '스트링',
        contents: 'english',
      },
      {
        id: '2',
        contentName: 'name2',
        contents: 'hmmm',
      },
      {
        id: '3',
        contentName: 'name3',
        contents: 'hmmm',
      },
    ];

    let wb = XLSX.utils.book_new();
    let ws = XLSX.utils.json_to_sheet(sample_data_to_export);
    XLSX.utils.book_append_sheet(wb, ws, 'Users');
    const file = XLSX.write(wb, {type: 'string', bookType: 'csv'});

    // Write generated excel to Storage
    writeFile(DownloadDirectoryPath + '/string2.csv', file, 'utf8')
      .then(res => {
        alert('Export Data Successfully..!');
      })
      .catch(e => {
        console.log('Error writeFile', e);
      });
  };

  const askPermission = () => {
    async function requestExternalWritePermission() {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Pdf creator needs External Storage Write Permission',
            message: 'Pdf creator needs access to Storage data in your SD Card',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          createCSV();
          console.log('Permission granted');
        } else {
          console.log('Permission Denied');
          alert('Permission Denied');
        }
      } catch (err) {
        alert('Write permission err', err);
        console.warn(err);
      }
    }
    if (Platform.OS === 'android') {
      requestExternalWritePermission();
    } else {
      createCSV();
      alert('IOS saved?');
    }
  };

  const createCSVpermission = async () => {
    // try {
    //   // Check for Permission (check if permission is already given or not)
    //   let isPermitedExternalStorage = await PermissionsAndroid.check(
    //     PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    //   );
    //   if (!isPermitedExternalStorage) {
    //     // ASK for permission
    //     const granted = await PermissionsAndroid.request(
    //       PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    //       {
    //         title: 'Storage Permission Needed',
    //         buttonNeutral: 'Ask me Later',
    //         buttonNegative: 'Cancel',
    //         buttonPositive: 'OK',
    //       },
    //     );
    //     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    //       exportDataToCSV();
    //       console.log('Permission granted');
    //     } else {
    //       console.log('Permission Denied');
    //       alert('Permission Denied');
    //     }
    //   } else {
    //     // Already have Permission (Calling our export)
    //     exportDataToCSV();
    //   }
    // } catch (e) {
    //   console.log('Error while checking permission');
    //   console.log(e);
    //   return;
    // }
  };

  return (
    <View style={styles.MainContainer}>
      <TouchableOpacity onPress={askPermission}>
        <Image
          source={{
            uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaJnsWXEDdlC5Hjn28KUVgd1IJp95h6YqsMKcC6SUq8RkWEuf0ef6IF7uJpHxWinpGFQM&usqp=CAU',
          }}
          style={styles.ImageStyle}
        />
        <Text style={styles.text}>Create CSV</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CsvScreen;

const styles = StyleSheet.create({
  MainContainer: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#123',
  },
  text: {
    color: 'white',
    textAlign: 'center',
    fontSize: 25,
  },
  ImageStyle: {
    height: 150,
    width: 150,
    resizeMode: 'center',
  },
});

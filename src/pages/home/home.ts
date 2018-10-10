import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { BLE } from '@ionic-native/ble';import { BluetoothSerial } from '@ionic-native/bluetooth-serial';
import { HttpDataProvider } from '../../providers/http-data/http-data';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public ip:string = "";

  constructor(public navCtrl: NavController,
              public qrScanner: QRScanner,
              private platform:Platform,
              private barcodeScanner: BarcodeScanner,
              private ble: BLE,
              private bluetoothSerial: BluetoothSerial,
              private http:HttpDataProvider) {
      //this.startScan();
      console.log("On home page...");

    this.platform.ready().then(()=>{

    })
  }

  scanQr(){
    let self = this;
    this.barcodeScanner.scan().then(barcodeData => {
      console.log('Barcode data', barcodeData);
      console.log('Ip Address', this.ip);
      let qrInfo = barcodeData.text;
      self.http.post({ url:`http://${this.ip}:3000/set_client_id`, body:{ "user_id" : qrInfo } });
    }).catch(err => {
      console.log('Error', err);
    });
  }

  // scanBluetooth(){
  //   // this.ble.scan([], 60).subscribe(result=>{
  //   //     console.log("Devices... ", result)
  //   // });
  //
  //   let self = this;
  //   this.ble.connect('B8:27:EB:CC:36:EE').subscribe(result=>{
  //     console.log("Connected...");
  //     console.log(result);
  //     self.ble.isConnected('B8:27:EB:CC:36:EE').then(res=>{
  //       console.log("Connected...",res)
  //     }).catch(err=>{
  //       console.log("Error", err);
  //     });
  //   });
  // }

  // scan2Bluetooth(){
  //   this.bluetoothSerial.connect("B8:27:EB:CC:36:EE").subscribe(res=>{
  //     console.log("connected");
  //     console.log(res);
  //   });

    // this.bluetoothSerial.discoverUnpaired().then(rdiscoverUnpairedes=>{
    //   console.log("Available devices ", res);
    // })
  }

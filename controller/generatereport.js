const { ConnectionCheckOutFailedEvent } = require('mongodb');
const mongoose = require('mongoose');

const ClientModel = mongoose.model('Client')
const Reference = mongoose.model('Reference')
const PoductsSchema = mongoose.model('PoductsSchema')
const Transportagent = mongoose.model('Transportagent')
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const { nanoid } = require('nanoid');
const pdfMaster = require("pdf-master");
exports.generatepurchasereport = async (req, res) => {
  let payable = 0
  let recievable = 0 ;
  let paid = 0
  let recieved = 0
    try {
      const existingClient = await ClientModel.findOne({ name: req.body.billTo });
  
      if (existingClient) {
        // If the client exists, update the coffee array
        existingClient.coffee.push({
          date: req.body.dateOfIssue,
          referenceselect: req.body.referenceselect,
          billTo: req.body.billTo,
          transportagent: req.body.transportagent,
          lorry: req.body.lorry,
          billtype: req.body.billtype,
          delivery: req.body.delivery,
          remarks: req.body.remarks,
          item: req.body.item,
          bags: req.body.bags,
          quantity: req.body.quantity,
          bagweight: req.body.bagweight,
          forignobject: req.body.forignobject,
          weightallowance: req.body.weightallowance,
          outern: req.body.outern,
          huskpercentage: req.body.huskpercentage,
          huskcutting: req.body.huskcutting,
          moisturepercentage: req.body.moisturepercentage,
          moisturecutting: req.body.moisturecutting,
          bbpercentage: req.body.bbpercentage,
          bbcutting: req.body.bbcutting,
          berryborepercentage: req.body.berryborepercentage,
          berryborecutting: req.body.berryborecutting,
          other: req.body.other,
          allowance: req.body.allowance,
          lotnumber:req.body.lotnumber,
          netepweight:req.body.netepweight,
          netWeight:req.body.netWeight,
          eppercentage:req.body.eppercentage,
          storage:req.body.netepweight - req.body.billedquantity,
          stat:req.body.reportstatus

  
        });
        const storeout = (existingClient.storeout||0)+0
        const storein = (existingClient.storein||0) + (req.body.netepweight - req.body.billedquantity)
        existingClient.storeout = storeout;
            existingClient.storein = storein;
        if(req.body.bill.length>0){
          for (const bill of req.body.bill) {
  
            // Push the new sales bill document to the client's salesbillSchema array
            existingClient.purchasebillSchema.push({
              date: bill.date,
              item: req.body.item,
              invoice: bill.billid,
              uniqueid: bill.uniqueid,
              commitment: bill.id,
              lotnumber: bill.lot,
              weight:parseInt((bill.quantity*100)/req.body.eppercentage),
              qty: bill.quantity,
              amount: bill.rate,
              subtotal: bill.total,
              sgst: bill.sgst,
              cgst: bill.cgst,
              igst: bill.igst,
              total: bill.total,
              tds: bill.tds
            });
            // const payable = (existingClient.payable||0) + bill.total
            // const recievable = (existingClient.recievable||0) + 0
            // const paid = (existingClient.paid||0) + payable>5000000?parseInt(bill.total*0.1/100):0
            // const recieved = (existingClient.recieved||0) + 0
            payable = payable + parseFloat(bill.total)
            recievable = recievable + 0
            paid = paid+((existingClient.payable + payable)>5000000?parseInt(bill.total*0.1/100):0)
            recieved = recieved + 0

            existingClient.payable = payable;
            existingClient.recievable = recievable;
            existingClient.paid = paid;
            existingClient.recieved = recieved;
            existingClient.transaction.push({
              name:req.body.name,
              date: bill.date,
              refference: req.body.item + ' ' + bill.quantity + '*' + bill.rate,
              revievable:0,
              payable:bill.total,
              medium:payable>5000000?'TDS':'Bill',
              id:bill.uniqueid,
              recieved:0,
              paid:payable>5000000?parseInt(bill.total*0.1/100):0,
            
              // Add other fields as needed
            });
  
            
  
            const purchasecommitment = existingClient.purchasecommitments.find(commitment => commitment.id === bill.id);
  
            if (purchasecommitment) {
              // Calculate the new balance by subtracting the delivered quantity from the total quantity
              const newBalance = purchasecommitment.balance - parseInt((bill.quantity*100)/req.body.eppercentage) ;
      
              // Update the balance in the sales commitment object
              purchasecommitment.balance = newBalance<0?0:newBalance;
          }
         
          }
  
        }
        await existingClient.save();
      }
      var data = {
        companyname:'HI TECH COFFEE',
        party:req.body.billTo ,
        item:req.body.item, 
        delivery:req.body.delivery, 
        date:req.body.dateOfIssue,
        vehicleno:req.body.lorry,
        type:'Purchase',
        bags: req.body.bags,
        quantity: req.body.quantity,
        bagweight: parseInt(req.body.bagweight*req.body.bags),
        netweights:parseInt(req.body.quantity-parseFloat(req.body.bagweight*req.body.bags)),
        forignobject: req.body.forignobject,
        weightallowance: parseFloat(req.body.quantity)-parseFloat(req.body.netWeight),
        huskpercentage: req.body.huskpercentage,
        outern: req.body.outern,
        huskcutting: req.body.huskcutting,
        moisturepercentage: req.body.moisturepercentage,
        moisturecutting: req.body.moisturecutting,
        bbpercentage: req.body.bbpercentage,
        bbcutting: req.body.bbcutting,
        berryborepercentage: req.body.berryborepercentage,
        berryborecutting: req.body.berryborecutting,
        other: req.body.other,
        allowance: req.body.allowance,
        lotnumber:req.body.lotnumber,
        netepweight:req.body.netepweight,
        eppercentage:parseFloat(req.body.eppercentage).toFixed(2),
        refference:req.body.referenceselect,
        netWeight:req.body.netWeight-req.body.huskcutting,
        status:req.body.reportstatus,
        bill:req.body.bill,
        tax:req.body.tax,
        taxtype:req.body.tax==0?'tax-exempt':req.body.tax==5?'cgst 2.5% + sgst 2.5%':'cgst 2.5% + sgst 2.5% + igst 5%',
        taxtotal:parseInt(payable* req.body.tax/100),
        total:payable,
        grandtotal:payable+parseInt(payable* req.body.tax/100),
        cuttings : parseInt(req.body.epweight)-parseInt(req.body.netepweight)

    }

    let options = {
      // displayHeaderFooter: true,
      format: "A4",
      margin: { top: "60px", bottom: "100px" },
      // base: 'file://' + path.resolve('./public') + '/'
    
    };
    
    let PDF = await pdfMaster.generatePdf("template.hbs", { data }, options);
  
    const filePath = path.join(__dirname, '..', 'public', 'report.pdf');
    fs.writeFileSync(filePath, PDF);
  
      res.status(201).json({ message: 'Form submitted successfully' });
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: 'Error submitting the form' });
    }
  };
  exports.generatesalesreport = async (req, res) => {
    try {
      const existingClient = await ClientModel.findOne({ name: req.body.billTo });
  
      if (existingClient) {
        // If the client exists, update the coffee array
        existingClient.despatch.push({
          date: req.body.dateOfIssue,
          referenceselect: req.body.referenceselect,
          billTo: req.body.billTo,
          transportagent: req.body.transportagent,
          lorry: req.body.lorry,
          billtype: req.body.billtype,
          delivery: req.body.delivery,
          remarks: req.body.remarks,
          item: req.body.item,
          bags: req.body.bags,
          quantity: req.body.quantity,
          bagweight: req.body.bagweight,
          forignobject: req.body.forignobject,
          weightallowance: req.body.weightallowance,
          outern: req.body.outern,
          huskpercentage: req.body.huskpercentage,
          huskcutting: req.body.huskcutting,
          moisturepercentage: req.body.moisturepercentage,
          moisturecutting: req.body.moisturecutting,
          bbpercentage: req.body.bbpercentage,
          bbcutting: req.body.bbcutting,
          berryborepercentage: req.body.berryborepercentage,
          berryborecutting: req.body.berryborecutting,
          other: req.body.other,
          allowance: req.body.allowance,
          lotnumber:req.body.lotnumber,
          netepweight:req.body.netepweight,
          netWeight:req.body.netWeight,
          eppercentage:req.body.eppercentage,
          storage:req.body.netepweight - req.body.billedquantity,
          stat:req.body.reportstatus
        });
        const storeout =(existingClient.storein||0) + (req.body.netepweight - req.body.billedquantity);
        const storein =  (existingClient.storeout||0)+0 ;
        existingClient.storeout = storeout;
            existingClient.storein = storein;
        if(req.body.bill.length>0){
          for (const bill of req.body.bill) {
  
            // Push the new sales bill document to the client's salesbillSchema array
            existingClient.salesbillSchema.push({
              date: bill.date,
              item: req.body.item,
              invoice: bill.billid,
              uniqueid: bill.uniqueid,
              commitment: bill.id,
              lotnumber: bill.lot,
              weight:parseInt((req.body.quantity*100)/req.body.eppercentage),
              qty: bill.quantity,
              amount: bill.rate,
              subtotal: bill.total,
              sgst: bill.sgst,
              cgst: bill.cgst,
              igst: bill.igst,
              total: bill.total,
              tds: bill.tds
            });   
             const salesCommitment = existingClient.salescommitmentsschema.find(commitment => commitment.id === bill.id);
            const payable = (existingClient.payable||0) + 0
            const recievable =( existingClient.recievable||0) + bill.total
            const paid = (existingClient.paid||0) + 0
            const recieved = (existingClient.recieved||0) + recievable>5000000?parseInt(bill.total*0.1/100):0
  
            existingClient.payable = payable;
            existingClient.recievable = recievable;
            existingClient.paid = paid;
            existingClient.recieved = recieved;
            existingClient.transaction.push({
              name:req.body.name,
              date: bill.date,
              refference: req.body.item + ' ' + bill.quantity + '*' + bill.rate,
              revievable:bill.total,
              payable:0,
              medium:recievable>5000000?'TDS':'Bill',
              id:bill.uniqueid,
              recieved:recievable>5000000?parseInt(bill.total*0.1/100):0,
              paid:0,
            
              // Add other fields as needed
            });
  
        
  
            if (salesCommitment) {
              // Calculate the new balance by subtracting the delivered quantity from the total quantity
              const newBalance = salesCommitment.balance - parseInt((bill.quantity*100)/req.body.eppercentage) ;
      
              // Update the balance in the sales commitment object
              salesCommitment.balance = newBalance<0?0:newBalance;
          }
         
          }
  
        }
  
        await existingClient.save();
      } 
      var data = {
        companyname:'HI TECH COFFEE',
        party:req.body.billTo ,
        item:req.body.item, 
        delivery:req.body.delivery, 
        date:req.body.dateOfIssue,
        vehicleno:req.body.lorry,
        type:'Sales',
        bags: req.body.bags,
        quantity: req.body.quantity,
        bagweight: parseInt(req.body.bagweight*req.body.bags),
        netweights:parseInt(req.body.quantity-parseFloat(req.body.bagweight*req.body.bags)),
        forignobject: req.body.forignobject,
        weightallowance: req.body.weightallowance,
        huskpercentage: req.body.huskpercentage,
        outern: req.body.outern,
        huskcutting: req.body.huskcutting,
        moisturepercentage: req.body.moisturepercentage,
        moisturecutting: req.body.moisturecutting,
        bbpercentage: req.body.bbpercentage,
        bbcutting: req.body.bbcutting,
        berryborepercentage: req.body.berryborepercentage,
        berryborecutting: req.body.berryborecutting,
        other: req.body.other,
        allowance: req.body.allowance,
        lotnumber:req.body.lotnumber,
        netepweight:req.body.netepweight,
        eppercentage:parseFloat(req.body.eppercentage).toFixed(2),
        refference:req.body.referenceselect,
        netWeight:req.body.netWeight-req.body.huskcutting,
        bill:req.body.bill,
        cuttings : parseInt(req.body.epweight)-parseInt(req.body.netepweight0)
    }
    
    let options = {
      // displayHeaderFooter: true,
      format: "A4",
      margin: { top: "60px", bottom: "100px" },
      // base: 'file://' + path.resolve('./public') + '/'
    
    };
    
    let PDF = await pdfMaster.generatePdf("template.hbs", { data }, options);
  
    const filePath = path.join(__dirname, '..', 'public', 'report.pdf');
    fs.writeFileSync(filePath, PDF);
      res.status(201).json({ message: 'Form submitted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error submitting the form' });
    }
  };
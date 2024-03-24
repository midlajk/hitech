action="/submit-bill" method="post"
//   // Function to handle form submission
// // Function to handle form submission
// // async function submitForm() {
// //   // Remove 'const' before 'form' to use the one declared in the outer scope
// //   const invoicenumber = document.getElementById('invoicenumber').value
// //  const billto = document.getElementById('billto').value
// //  const dateOfIssue = document.getElementById('dateOfIssue').value
// //  const gst = document.getElementById('gst').value
// //  const billToAddress = document.getElementById('billToAddress').value
// //  const lorry = document.getElementById('lorry').value
// //  const billtype = document.getElementById('billtype').value
// //  const commitment = document.getElementById('commitment').value
// //  const item = document.getElementById('item').value
// //  const bags = document.getElementById('bags').value
// //  const quantity = document.getElementById('quantity').value
// //  const price = document.getElementById('price').value
// //  const cgst = document.getElementById('cgst').value
// //  const sgst = document.getElementById('sgst').value
// //  const igst = document.getElementById('igst').value
// //  const notes = document.getElementById('notes').value
// //  const outern = document.getElementById('outern').value
// //  const moisture = document.getElementById('moisture').value
// //  const blacks = document.getElementById('blacks').value
// //  const husk = document.getElementById('husk').value
// //  const aaa = document.getElementById('aaa').value
// //  const aa = document.getElementById('a').value
// //  const a = document.getElementById('a').value
// //  const b = document.getElementById('b').value
// //  const c = document.getElementById('c').value
// //  const pberry = document.getElementById('pberry').value
 

// //   try {
// //     console.log('here')
// //     const response = await fetch('/submit-bill', {
// //       method: 'POST',
// //       body: {
// //         invoicenumber,
// //         billto,
// //         dateOfIssue,
// //         gst,
// //         billToAddress,
// //         lorry,
// //         billtype,
// //         commitment,
// //         item,
// //         bags,
// //         quantity,
// //         price,
// //         cgst,
// //         sgst,
// //         igst,
// //         notes,
// //         outern,
// //         moisture,
// //         blacks,
// //         husk,
// //         aaa,
// //         aa,
// //         a,
// //         b,
// //         c,
// //         pberry
// //       },
// //     });

// //     if (response.ok) {
// //       alert('Form submitted successfully');
// //       // You can redirect or perform any other action here
// //     } else {
// //       alert('Error submitting the form');
// //     }
// //   } catch (error) {
// //     console.log('Error:', error);
// //     alert('Error submitting the form');
// //   }
// // }

// // // Add an event listener to the "Generate Invoice" button



  //   pdf.create(url, options).toFile(filePath, (err) => {
        // if (err) return console.error('Error generating PDF:', err);
        // console.log('PDF generated successfully:', filePath);

        //   });     
       
  
      // let PDF = await pdfMaster.generatePdf("template.hbs", { data }, options);

      // const filePath = path.join(__dirname, '..', 'public', 'report.pdf');
      // fs.writeFileSync(filePath, PDF);

    // const templatePath = path.join(__dirname, 'template.hbs');

    // // Compile Handlebars template
    // const template = fs.readFileSync(templatePath, 'utf8');
    // const compiledTemplate = handlebars.compile(template);
    // const html = compiledTemplate({ data });
    // console.log(html)
    
    // // Options for PDF generation
 
    // // Output PDF path
    // const pdfPath = path.join(__dirname, '..', 'public', 'report.pdf');
    
    // // Generate PDF from the compiled HTML
    // pdf.create(html, options).toFile(pdfPath, (err) => {
    //     if (err) return console.error('Error generating PDF:', err);
    //     console.log('PDF generated successfully:', pdfPath);

    // });        

  //   const html = fs.readFileSync(path.join(__dirname, 'template.html'), 'utf-8');
    
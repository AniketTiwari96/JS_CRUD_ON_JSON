const fs = require ('fs');
var input = require ("readline-sync");

while ( true ) {
    try {
        const j = {};
        console.log('\nWhat do you want choice ');
        console.log(`\npress 1 for create\npress 2 for read\npress 3 for update\npress 4 for delete\npress 5 for exist\n`);

        // function banaya hai jisse gmail id galat input karne par baar baar code chale gaaa
        function cheakgmail () {
            const mail = input.question(`Plese enter your gmail id => `)
            if ( mail.includes('@') && mail.includes('gmail.com') ){
                return mail;
            } else {
                console.log(`\nyour gmail id is not right\nplease enter your right gmail id \n`);
                return cheakgmail ();
            }
        }
        const Mo_Number=()=>{
            const M_Number=input.question('Please enter your mobile number => ');
            if(M_Number.length == '10'){
                return M_Number;
            }else{
                console.log('Your mobile number lenght is not right\nPlease enter your right mobile number ');
                return Mo_Number();
            }
        }

        let create = () => {
            if ( !fs.existsSync('file.json') ){ 
                let mail = input.question(`Plese enter your gmail id => `)
                if ( mail.includes('@') && (mail.includes('gmail.com'))) {
                    console.log(` your gmail is right `);
                    j[mail]={'user-id':input.question('Please enter your user id => '),
                    'first-name':input.question('enter your first name => '),
                    'last-name':input.question('Please enter your last name => '),
                    'age':input.questionInt('enter your age =>'),
                    'M-Number':Mo_Number()
                    }
                    fs.writeFileSync("file.json",JSON.stringify(j,null,4));
                    console.log('data is done');
                }
                else {
                    console.log(`your gmail is not right\nplease enter your right gmail .`);
                }
            }
            else {
                const data = fs.readFileSync('file.json','utf-8')
                const info = JSON.parse(data);
                if(info!=""){
                    // yaha function ko call kiya hai 
                    const mail = cheakgmail ();
                    console.log(`your gmail is right :`);
                    info[mail] = {'user-id':input.question('Please enter your user id => '),
                    'first-name':input.question('enter your first name => '),
                    'last-name':input.question('Please enter your last name => '),
                    'your-age':input.questionInt('enter your age => '),
                    'Phoone-Number':Mo_Number()}
                    fs.writeFileSync("file.json",JSON.stringify(info,null,4));
                    console.log('data is done');
                    
                } else {
                    console.log(' here is not Data ');
                }
            
            }
            
        };

        let read = () => {
            const data = fs.readFileSync('file.json','utf-8');
            const info = JSON.parse(data);
            console.log('full data',info);
            // yaha function ko call kiya hai 
            let mail = cheakgmail ();
            if ( mail in info ) {
                console.log('Your gmail data ',info[mail]);
            } else {
                console.log('mail is not exit ');
                read ();
            }
        };

        let update = () => {
            const data = fs.readFileSync('file.json','utf-8');
            const info = JSON.parse(data);
            console.log('Your full data', info);
            const mail = cheakgmail();
            if( mail in info ){
                console.log('your data',info[mail]);
                console.log('What do you want to update ');
                console.log(`\npress 1. for user id update,\npress 2. for first name update.\npress 3. for last name update.\npress 4. for age update.\npress 5. for mobile number update.\npress 6. for all update.\n`);
                const choice = input.questionInt('Please enter your choice=> ');

                if ( choice === 1 ) {
                    info[mail]["user-id"] = input.question('Please enter your new user id => ');
                    fs.writeFileSync('file.json',JSON.stringify(info,null,4));
                    console.log('data is updated ');

                } else if ( choice === 2 ){
                    info[mail]['first-name'] = input.question('Please enter your new first name =>');
                    fs.writeFileSync('file.json',JSON.stringify(info,null,4));
                    console.log('your data is updated :');

                } else if ( choice === 3 ){
                    info[mail]['last-name']=input.question('Please enter your new last name =>');
                    fs.writeFileSync('file.json',JSON.stringify(info,null,4));
                    console.log('your data is updated ');

                } else if ( choice === 4 ){
                    info[mail]['your-age'] = input.question('Please enter your new age =>');
                    fs.writeFileSync('file.json',JSON.stringify(info,null,4));
                    console.log('your data is updated ');
                } else if ( choice === 5 ){
                    info[mail]['phone-number'] = input.question('Please enter your new phone number =>');
                    fs.writeFileSync('file.json',JSON.stringify(info,null,4));
                    console.log('your data is updated ');
                }
                else if ( choice === 6 ){info[mail] = {'user-id':input.question('Please enter your new user id => '),
                'first-name':input.question('Please enter your new first name => '),
                'last-name':input.question('Please enter your new last name =>'),
                'your-age':input.question('Please enter your new age =>'),
                'mobile-number':Mo_Number()
                }
                fs.writeFileSync('file.json',JSON.stringify(info,null,4));
                console.log(`data is updated `);}
                
            } else { 
                console.log(`gmail is not exit `);
                update ();
            }
        }
        let delete1 = () => {
            const data = fs.readFileSync('file.json','utf-8');
            const info = JSON.parse(data);
            console.log('Your full data ',info);
            let mail = cheakgmail ();
            if ( mail in info ) {
                console.log('your deleted data',info[mail]);
                console.log('\nWhat do you want to delete ');
                console.log(`\npress 1. for delete user id ,\npress 2. for delete first name .\npress 3. for delete last name \npress 4. for delete age.\npress 5. for delete mobile number.\npress 6. for delete all .\n`);
                const choice=input.questionInt('Please enter your choice => ');

                if ( choice === 1 ){
                    delete info[mail]["user-id"];
                    fs.writeFileSync('file.json',JSON.stringify(info,null,4));
                    console.log('user id deleted ');

                } else if ( choice === 2 ){
                    delete info[mail]['first-name'];
                    fs.writeFileSync('file.json',JSON.stringify(info,null,4));
                    console.log('Your first name is deleted ');

                } else if ( choice === 3 ){
                    delete info [mail]['last-name'];
                    fs.writeFileSync('file.json',JSON.stringify(info,null,4));
                    console.log('Your last name is deleted ');

                } else if ( choice === 4 ){
                    delete info[mail]['your-age'];
                    fs.writeFileSync('file.json',JSON.stringify(info,null,4));
                    console.log('Your age is deleted ');

                } else if ( choice === 5 ){
                    delete info[mail]['mobile-number'];
                    fs.writeFileSync('file.json',JSON.stringify(info,null,4));
                    console.log( 'Your mobile-number is deleted ');

                } else if ( choice === 6 ){
                    delete info[mail];
                    fs.writeFileSync('file.json',JSON.stringify(info,null,4));
                    console.log('Your full dat is deleted ');
                }
                
            } else {
                console.log('your gmail id does not exit ');
                delete1 ();
            }
        }
        const choice = input.questionInt(`Please enter your choice => `);
        if ( choice === 1 ) {
            create ();
        } else if ( choice === 2 ) {
            read ();
        } else if ( choice === 3 ) {
            update ();
        } else if ( choice === 4 ) {
            delete1 ();
        } else if ( choice === 5 ) {
            console.log(`Your program has been stopped `);
            break ;
        }
    } catch (error) {
            console.log(error.massege);
        }
}
    

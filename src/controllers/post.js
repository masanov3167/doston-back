const {sqlData} = require('../utils/pg');
const {schema, phoneRegex} = require('../utils/validate')
const uuid = require('uuid')

const postData = async(req, res) =>{
   try{
    const {pasport, rasm, diplom, inn, buyruq, unvon} = req.files;
    
    const {error, value} = schema.validate({...req.body, ...req.files})
    
    if(error || !req.body.number.match(phoneRegex)){
        const img = [pasport[0].filename,rasm[0].filename, diplom[0].filename, inn[0].filename, buyruq[0].filename, unvon[0].filename ]

        for(let i of img){
            require('fs').unlinkSync(require('path').join(__dirname, '..', 'uploads', i))
        }

        return res.status(500).json({status:500, message: 'invalid request'}) 
    }
    const obj = [
        {
            path: 'uploads/' + value.pasport[0].filename,
            id: uuid.v4(),
            type: value.pasport[0].mimetype
        },
        {
            path: 'uploads/' + rasm[0].filename,
            id: uuid.v4(),
            type: value.rasm[0].mimetype
        },
        {
            path: 'uploads/' + diplom[0].filename,
            id: uuid.v4(),
            type: value.diplom[0].mimetype
        },
        {
            path: 'uploads/' + inn[0].filename,
            id: uuid.v4(),
            type: value.inn[0].mimetype
        },
        {
            path: 'uploads/' + buyruq[0].filename,
            id: uuid.v4(),
            type: value.buyruq[0].mimetype
        },
        {
            path: 'uploads/' + unvon[0].filename,
            id: uuid.v4(),
            type: value.unvon[0].mimetype
        }
    ]

    const {malaka, studyaddress, fish, number, pass, region, district, tashkilot, info, expert, level, sport, shakl, turi, sportturi, til} = value

   await sqlData('insert into docs(malaka, studyaddress, fish, number, pass, region, district, tashkilot, info, expert, level, sport, shakl, turi, sportturi, til,pasport, rasm, diplom, inn, buyruq, unvon) values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22)', malaka, studyaddress, fish, number, pass, region, district, tashkilot, info, expert, level, sport, shakl, turi, sportturi, til, JSON.stringify(obj[0]), JSON.stringify(obj[1]),JSON.stringify(obj[2]),JSON.stringify(obj[3]),JSON.stringify(obj[4]),JSON.stringify(obj[5]) )
    
    res.json('oqey');
   }
   catch(err){
    res.status(500).json({status:500, message: 'invalid request'}) 
   }
}

const GET = async (_, res) =>{
    const result = await sqlData('select * from docs order by id desc');
    return res.status(200).json({status:200, data: result})
}

const find = (arr, id) =>{
    let obj = ''

    const found = arr.find(a => a.pasport.id || a.rasm.id || a.inn.id || a.diplom.id || a.buyruq.id || a.unvon.id == id);
    
    if(found.pasport && found.pasport.id === id){
        obj = found.pasport
    }

    if(found.rasm && found.rasm.id === id){
        obj = found.rasm
    }

    if(found.inn && found.inn.id === id){
        obj = found.inn
    }

    if(found.diplom && found.diplom.id === id){
        obj = found.diplom
    }

    if(found.buyruq && found.buyruq.id === id){
        obj = found.buyruq
    }

    if(found.unvon && found.unvon.id === id){
        obj = found.unvon
    }
    return obj.path;
}

const DOWN = async (req, res) =>{
    const {id} = req.params;

    const data = await sqlData('select * from docs');

    res.download(require('path').join(__dirname, '..', find(data, id)))
}

module.exports = {
    postData,
    GET,
    DOWN
};
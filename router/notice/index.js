const express = require('express');
const router = express.Router();
const connection = require('../config/database.js')
const multer = require('multer')
const path = require('path')
const fs = require('fs')

const upload = multer({
  storage: multer.diskStorage({ 
    destination: function (req, file, cb) { // 저장 파일경로
      cb(null, 'public/images/')
    },
    filename: function (req, file, cb) {  // 파일이름
      cb(null, new Date().valueOf() + path.extname(file.originalname))  // 날짜 원시값 + 확장자
    },
    fileFilter: function(req, file, cb) { // 파일필터
      if (file.mimetype !== 'image/png' && file.mimetype !== 'image/jpg' && file.mimetype !== 'image/jpeg') {
          req.validateErr = '"JPG, PNG 이미지만 업로드 가능합니다."'
          return cb(null, false, new Error('JPG, PNG 이미지만 업로드 가능합니다'));
          } else {
              cb(null, true)
          }
          cb(null, true);
    },
    limits: { fileSize: 5 * 1024 * 1024 }
  }),
})

// (../:no) 이런식은 :뒤에 데이로 받기 위함
router.get('/detail/:no', (req, res) => {
  console.log('[[[[[ NOTICE DETAIL ]]]]]')
  console.log('no = ', req.params.no); //.get()은 params로 받는다

  const no = req.params.no
  connection.query(`SELECT 
                      NOTICE_TP
                    , SUBJ
                    , INIT
                    , CONTS
                    , ORI_IMG_NAME
                    , PHY_IMG_NAME
                    , REGR
                    , REG_DT
                    , URDR
                    , UPD_DT                    
                      FROM TB_NOTICE 
                      WHERE NOTICE_MNG_NO = ?
                      AND USE_YN = '1'`, [no], (err, rows) => {
    if(err) return res.status(401).json({err:'에러발생'})
    console.log(rows[0]);

    const resData = {}
    if (rows[0]) {

      resData.ok = true
      resData.body = rows[0]

      res.status(200)
      res.json(resData)
      
    } else {
      resData.ok = true
      res.status(200)
      res.json(resData)
    }
  })
})

router.get('/list', (req, res) => {
  console.log('[[[[[ NOTICE LIST ]]]]]')
  console.log('req.query = ', req.query)

  const search = req.query.search

  connection.query(`SELECT 
                      NOTICE_MNG_NO
                    , NOTICE_TP
                    , SUBJ
                    , CONTS
                    , DATE_FORMAT(REG_DT, "%Y-%m-%d %H:%i") REG_DT
                    FROM TB_NOTICE
                    WHERE USE_YN = '1'
                    AND SUBJ LIKE '%${search}%'
                    ORDER BY NOTICE_MNG_NO DESC`, (err, rows) => { //최시순대로 정렬해주는 쿼리
    if(err) return res.status(401).json({err:'에러발생'})
    //data에 있는 정보를 가져와서 불러오는 것 즉 rows.length가 데이터가 있는지 없는지 확인하는 조건
    // if(rows.length) {
      // console.log(rows)

      const resData = {}

      resData.ok = true
      resData.body = rows

      res.status(200)
      res.json(resData)
    // }
  })
})

router.post('/register', upload.single('image'), (req, res) => {
  console.log('[[[[[ NOTICE REGISTER]]]]]') //디버깅을 위한 콘솔로그
  console.log(' REGISTER REQ', req.body); 

  // const form = req.body.form
  const form = JSON.parse(req.body.form)
  const subj = form.subj,
        dpTp = form.dpTp,
        init = form.init,
        conts = form.conts
  // const {subj, dpTp, init, conts} = form -> 구조분해할당
  let oriImgName = '',
      phyImgName = ''

  if(req.file) {
    oriImgName = req.file.originalname
    phyImgName = req.file.filename
  }

  console.log(oriImgName)
  console.log(phyImgName)
  
  // connection.connect()
  connection.query(`INSERT INTO TB_NOTICE
        (   NOTICE_TP
          , SUBJ
          , INIT
          , CONTS
          , ORI_IMG_NAME
          , PHY_IMG_NAME
          , REGR
          , REG_DT
          , URDR
          , UPD_DT
        )
        VALUES
        (
            ?
          , ?
          , ?
          , ?
          , ?
          , ?
          , 'admin'
          , now()
          , 'admin'
          , now()
        )`
      , [ dpTp, subj, `${init}`, conts, oriImgName, phyImgName]
      , ( err, rows ) => {
        console.log('rows =', rows);
        if (err) return res.status(401).end(JSON.stringify({err:'에러발생'}))
        if (rows.affectedRows > 0) { //affectedRows = 1은 데이터가 전달됬다는 의미

          const resData = {}
          
          resData.insertId = rows.insertId
          resData.ok = true

          res.status(200)
          res.end(JSON.stringify(resData))

        }
      }
    )
})

router.post('/modify', upload.single('image'), (req, res) => {
  console.log('[[[[[ NOTICE MODIFY]]]]]') //디버깅을 위한 콘솔로그
  console.log(' REGISTER REQ', req.body); 

  const form = JSON.parse(req.body.form)
  let {subj, dpTp, init, conts, oriImgName, phyImgName} = form
  // console.log(form)
  // console.log(form.oriImgName)
  const no = req.body.no
  const imgPath = `public/images/${phyImgName}`
  // connection.connect()
  if(req.file) {
    console.log('==== is req.file ====')
    if(phyImgName) fs.unlinkSync(imgPath)
    oriImgName = req.file.originalname
    phyImgName = req.file.filename
  }
  if(!oriImgName && !req.file) {
    console.log('==== is not req.file ====')

    //원래 이미지가 있을 경우에만
    if(phyImgName) {
      fs.unlinkSync(imgPath)
      oriImgName = ''
      phyImgName = ''
    }
  }

  connection.query(`UPDATE TB_NOTICE SET
          NOTICE_TP = ?
        , SUBJ      = ?
        , INIT      = ?
        , CONTS     = ?
        , ORI_IMG_NAME = ?
        , PHY_IMG_NAME = ?
        , URDR      = 'admin'
        , UPD_DT    = now()
        WHERE NOTICE_MNG_NO = ?
        AND USE_YN = '1'`
      , [ dpTp, subj, `${init}`, conts, oriImgName, phyImgName, no ]
      , ( err, rows ) => {
        console.log('rows =', rows);
        if (err) return res.status(401).end(JSON.stringify({err:'에러발생'}))
        if (rows.affectedRows > 0) { //affectedRows = 1은 데이터가 전달됬다는 의미

          const resData = {}
          
          // // resData.modifyId = no
          resData.insertId = rows.insertId
          resData.ok = true

          res.status(200)
          res.end(JSON.stringify(resData))

        }
      }
    )
})

router.post('/delete', (req, res) => {
  console.log('[[[[[ NOITCCE dELETE ]]]]]')
  console.log('REGISTER REQ', req.body.form)

  const no = req.body.no

  connection.query(`UPDATE TB_NOTICE SET USE_YN = '0' WHERE NOTICE_MNG_NO = ?`
        , [no] 
        , (err, rows) => {
          console.log('rows = ', rows);
          if (err) return res.status(401).end(JSON.stringify({err: '에러발생'}))
          
          if(rows.affectedRows > 0) {
            const resData = {}
            
            resData.insertId = rows.insertId
            resData.ok = true
            
            res.status(200)
            res.end(JSON.stringify(resData))
          }
        }
      )
})

module.exports = router
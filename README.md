# swirl-portfolio

add cache control:

<meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />

<?php Header("Cache-Control: max-age=3000, must-revalidate"); ?>

app.get('/something.json', function (req, res, next) {
  res.JSONResponse = { 'hello': 'world' };
  next(); // important! 
});

// ...

// Before your error handling middleware:

app.use(function (req, res, next) {
  if (! ('JSONResponse' in res) ) {
    return next();
  }

  res.set('Cache-Control', 'public, max-age=31557600');
  res.json(res.JSONResponse);
})

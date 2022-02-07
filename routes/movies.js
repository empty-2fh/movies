const { Router } = require( 'express' );

const router = Router();

router.get( '/', ( req, res ) => res.json( 'GET xd' ) );

module.exports = router;
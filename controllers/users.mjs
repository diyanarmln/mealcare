import jsSHA from 'jssha';
// import { resolve } from 'path';

export default function initUsersController(db) {
  const login = async (req, res) => {
    try {
      const user = await db.User.findOne({
        where: {
          email: req.body.emailInput,
        },
      });
      console.log('user password', user.password);
      if (!user) {
        res.status(401).send('Wrong username or password');
        return;
      }

      // eslint-disable-next-line new-cap
      const shaObj = new jsSHA('SHA-512', 'TEXT', { encoding: 'UTF8' });
      shaObj.update(req.body.passwordInput);
      const hashedPassword = shaObj.getHash('HEX');

      if (user.password !== hashedPassword) {
        res.status(401).send('Wrong username or password');
        return;
      }

      res.cookie('loggedIn', true);
      res.cookie('userId', user.id);
      res.send({ login: true });
    }
    catch (error) {
      console.log(error);
    }
  };

  const dashboard = async (req, res) => {
    console.log('userid', req.cookies.userId);

    try {
      const user = await db.User.findOne({
        where: {
          id: req.cookies.userId,
        },
      });
      console.log('user', user);
      res.send({ user });
    }
    catch (error) {
      console.log(error);
    }
  };
  return { login, dashboard };
}

import jsSHA from 'jssha';
import { resolve } from 'path';

export default function initUsersController(db) {
  const login = async (req, res) => {
    try {
      const user = await db.User.findOne({
        where: {
          email: req.body.emailInput,
        },
      });
      console.log('user password', user.password);

      // eslint-disable-next-line new-cap
      const shaObj = new jsSHA('SHA-512', 'TEXT', { encoding: 'UTF8' });
      shaObj.update(req.body.passwordInput);
      const hashedPassword = shaObj.getHash('HEX');

      if (hashedPassword === user.password) {
        res.cookie('loggedIn', true);
        res.cookie('userId', user.id);
        res.sendFile(resolve('dist', 'main.html'));
      } else {
        res.send('you need to log in');
      }
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

import { NotFoundError, BadMethodError } from 'restify-errors';
import shortid from 'shortid';
import Url from './models/url-model';
import isValidUrl from './utils/validations';

/**
 * GET /url/:code
 * @param  req
 * @param  res
 * @param  {Function} next
 * @return {Promise}
 */
const redirectCtrl = async (req, res, next) => {
  try {
    const { code } = req.params;
    const url = await Url.findOne({ code });
    if (url) {
      return res.redirect(url.url);
    }
    throw new NotFoundError(`could not find url with code ${code}.`);
  } catch (error) {
    return next(error);
  }
};

/**
 * POST /url
 * @param  req
 * @param  res
 * @param  {Function} next
 * @return {Promise}
 */
const postCtrl = async (req, res, next) => {
  try {
    const { url } = req.body;
    if (!isValidUrl(url)) {
      throw new BadMethodError(`invalid url: ${url}`);
    }
    const code = shortid.generate();
    const newUrl = new Url({ url, code });
    await newUrl.save();
    return res.json(newUrl);
  } catch (error) {
    return next(error);
  }
};

export {
  redirectCtrl,
  postCtrl,
};

const keystone = require('keystone');
const Movie = keystone.list('Movie');

const directorPageLink = require('../helpers/directorLink.js');
const extractId = require('../helpers/extract_movie_id.js');
const { localizeResults, } = require('../helpers/localize_results.js');

exports = module.exports = (req, res) => {
  const localizeForLocale = results =>
    localizeResults(res.locals.locale, results);

  const view = new keystone.View(req, res);
  view.on('init', next => {
    const locals = res.locals;

    locals.movie = {};
    locals.director = {};
    locals.resources = [];
    locals.references = [];
    locals.videos = [];
    locals.genres = [];
    locals.themes = [];
    locals.full_url = locals.site_url + req.url;

    Movie.model
      .findOne({ key: req.params.name, })
      .populate('director')
      .populate('resources')
      .populate('references')
      .populate('themes')
      .populate('videos')
      .exec((err, movie) => {
        if (err || !movie) {
          res.status(404).render('errors/404');
          return;
        }
        locals.movie = localizeForLocale(movie);
        locals.title = `${locals.locale === 'en'
          ? locals.movie.name
          : locals.movie.name_chn}${res.__('app.short_title')}`;

        locals.videoId = extractId(movie.video);
        locals.director = localizeForLocale(movie.director);
        locals.themes = localizeForLocale(movie.themes);
        locals.genres = localizeForLocale(movie.genre);
        locals.directorPage = directorPageLink(locals.director.name);
        locals.references = locals.movie.references;
        locals.videos = locals.movie.videos.map(video => {
          video.videoId = extractId(video.videoUrl);
          return video;
        });
        console.log("locals.resources: ", locals.resources);
        // console.log("locals.references: ", locals.references);
        console.log("locals.movie.references: ", locals.movie.references);
        next();
      });
  });

  view.render('movie_profile');
};

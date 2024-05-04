(() => {
  const t = document.querySelectorAll('.units'),
    e = document.getElementById('fahrenheit'),
    o = document.getElementById('celcius'),
    n = document.getElementById('wind-unit'),
    a = document.getElementById('input'),
    c = document.getElementById('searchButton'),
    r = document.getElementById('date'),
    d = document.getElementById('locationSpan'),
    s = document.getElementById('current-weather'),
    u = document.getElementById('today-temp'),
    y = document.getElementById('weather-img'),
    l = document.getElementById('feels-like-p'),
    i = document.getElementById('humidity-p'),
    m = document.getElementById('wind-s'),
    f = document.querySelector('#forecast-card-day1 h4'),
    h = document.querySelector('#forecast-card-day1 h3'),
    p = document.querySelector('#forecast-card-day1 img'),
    x = document.querySelector('#forecast-card-day1 #current-temp'),
    C = document.querySelector('#forecast-card-day1 #low'),
    g = document.querySelector('#forecast-card-day1 #high'),
    S = document.querySelector('#forecast-card-day2 h4'),
    E = document.querySelector('#forecast-card-day2 h3'),
    q = document.querySelector('#forecast-card-day2 img'),
    w = document.querySelector('#forecast-card-day2 #current-temp'),
    B = document.querySelector('#forecast-card-day2 #low'),
    I = document.querySelector('#forecast-card-day2 #high'),
    F = document.querySelector('#forecast-card-day3 h4'),
    v = document.querySelector('#forecast-card-day3 h3'),
    M = document.querySelector('#forecast-card-day3 img'),
    _ = document.querySelector('#forecast-card-day3 #current-temp'),
    b = document.querySelector('#forecast-card-day3 #low'),
    D = document.querySelector('#forecast-card-day3 #high');
  async function k(t) {
    return (
      await fetch(
        `http://api.weatherapi.com/v1/forecast.json?key=4431d0b0cbb648bca1b25001241503&q=${t}&days=3`,
        { mode: 'cors' },
      )
    ).json();
  }
  (async () => {
    G(await k('montreal'));
  })();
  const L = {
    weekday: 'short',
    year: 'numeric',
    day: 'numeric',
    month: 'long',
  };
  !(function () {
    const t = new Date();
    r.textContent = t.toLocaleDateString(void 0, L);
  })(),
    c.addEventListener('click', async (t) => {
      t.preventDefault();
      const e = a.value;
      try {
        G(await k(e));
      } catch (t) {
        console.log('Error fetching weather data:', t);
      }
    });
  let $ = !0;
  function A(t) {
    return parseInt(t, 10);
  }
  function j(t) {
    return parseFloat(t);
  }
  function K(t) {
    return Math.round(t);
  }
  function z(t) {
    if ('celcius' === t) {
      document.querySelectorAll('.temperature').forEach((t) => {
        const e = K((5 * (A(t.textContent) - 32)) / 9);
        t.textContent = e;
      });
      const t = document.getElementById('wind-s'),
        e = (1.609 * j(t.textContent)).toFixed(1);
      t.textContent = e;
      const o = document.querySelectorAll('.units');
      (document.getElementById('wind-unit').textContent = 'Kph'),
        o.forEach((t) => {
          t.textContent = '°C';
        });
    } else if ('fahrenheit' === t) {
      document.querySelectorAll('.temperature').forEach((t) => {
        const e = K((9 * A(t.textContent)) / 5 + 32);
        t.textContent = e;
      });
      const t = document.getElementById('wind-s'),
        e = (j(t.textContent) / 1.609).toFixed(1);
      t.textContent = e;
      const o = document.querySelectorAll('.units');
      (document.getElementById('wind-unit').textContent = 'Mph'),
        o.forEach((t) => {
          t.textContent = '°F';
        });
    }
  }
  function G(e) {
    (d.textContent = e.location.name),
      (s.textContent = e.current.condition.text),
      (u.textContent = Math.round(parseFloat(e.current.temp_c))),
      (y.src = `https:${e.current.condition.icon}`),
      (l.textContent = Math.round(parseFloat(e.current.feelslike_c))),
      (i.textContent = `${e.current.humidity}%`),
      (m.textContent = Math.round(parseFloat(e.current.wind_kph)));
    const o = e.forecast.forecastday[0].date,
      a = new Date(o).toLocaleDateString(void 0, L);
    (f.textContent = a),
      (h.textContent = e.forecast.forecastday[0].day.condition.text),
      (p.src = `https:${e.forecast.forecastday[0].day.condition.icon}`),
      (x.textContent = Math.round(
        parseFloat(e.forecast.forecastday[0].day.avgtemp_c),
      )),
      (C.textContent = Math.round(
        parseFloat(e.forecast.forecastday[0].day.mintemp_c),
      )),
      (g.textContent = Math.round(
        parseFloat(e.forecast.forecastday[0].day.maxtemp_c),
      ));
    const c = e.forecast.forecastday[1].date,
      r = new Date(c).toLocaleDateString(void 0, L);
    (S.textContent = r),
      (E.textContent = e.forecast.forecastday[1].day.condition.text),
      (q.src = `https:${e.forecast.forecastday[1].day.condition.icon}`),
      (w.textContent = Math.round(
        parseFloat(e.forecast.forecastday[1].day.avgtemp_c),
      )),
      (B.textContent = Math.round(
        parseFloat(e.forecast.forecastday[1].day.mintemp_c),
      )),
      (I.textContent = Math.round(
        parseFloat(e.forecast.forecastday[1].day.maxtemp_c),
      ));
    const k = e.forecast.forecastday[2].date,
      $ = new Date(k).toLocaleDateString(void 0, L);
    (F.textContent = $),
      (v.textContent = e.forecast.forecastday[2].day.condition.text),
      (M.src = `https:${e.forecast.forecastday[2].day.condition.icon}`),
      (_.textContent = Math.round(
        parseFloat(e.forecast.forecastday[2].day.avgtemp_c),
      )),
      (b.textContent = Math.round(
        parseFloat(e.forecast.forecastday[2].day.mintemp_c),
      )),
      (D.textContent = Math.round(
        parseFloat(e.forecast.forecastday[2].day.maxtemp_c),
      )),
      t.forEach((t) => {
        t.textContent = '°C';
      }),
      (n.textContent = 'Kph');
  }
  e.addEventListener('click', (t) => {
    t.preventDefault(),
      $ && ((e.disabled = !0), (o.disabled = !1), z('fahrenheit'), ($ = !1));
  }),
    (o.disabled = !0),
    o.addEventListener('click', (t) => {
      t.preventDefault(),
        $
          ? (o.disabled = !0)
          : (z('celcius'), (o.disabled = !0), (e.disabled = !1), ($ = !0));
    });
})();

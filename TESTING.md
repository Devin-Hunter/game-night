# Instructions for testing app using Docker

## Directions to start app:

1. docker volume create postgres-data
2. docker-compose build
3. docker-compose up

## To see api endpoints in browser:

http://localhost:8000/docs


## Main Page

http://localhost:5173/

When running the app for the 1st time after pulling changes for the Tailwind/Flowbite install, it may take several minutes to download.
This screenshot is the verification that the GHI container has finished installing Tailwind, Flowbite, and all their dependancies.

![GHI-screenshot](docs/img/GHI_container_ready.png)
![Flowbite-success](docs/img/Flowbite%20Successful%20Install.png)


## Front-End Development

To use Flowbite components, navigate to https://flowbite.com/docs/components/sidebar/

# Instructions for deployed website

## Prep before Front-End Deployment

run docker compose up and look at your ghi logs. Address any warnings mentioned there

### Replace all <a> tags with <Link>

```
<a> Tag Example:

<a href="/" className="btn btn-primary"></a>

New <Link> Tag Example:

<Link to="/" className="btn btn-primary"></Link>
```

### Replace all React fetch request URLS

Pre-deployment Fetch Example:
```
const res = await fetch('http://localhost:8000/api/foobar');
```

Replace Local Host URL with VITE_API_HOST Example:
```
const res = await fetch(`${VITE_API_HOST}/api/foobar`);
```

## Deployed Website URL

https://game-night2.gitlab.io/game-night/

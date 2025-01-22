/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'i.ytimg.com',
          port: '', // Laissez vide si aucune configuration spécifique au port n'est nécessaire
          pathname: '/**', // Autoriser tous les chemins
        },
        {
            protocol: 'https',
            hostname: '"yt3.ggpht.com',
            port: '', // Laissez vide si aucune configuration spécifique au port n'est nécessaire
            pathname: '/**', // Autoriser tous les chemins
        },
      ],
    },
  };

export default nextConfig;

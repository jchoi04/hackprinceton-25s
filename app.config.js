export default {
    expo: {
      name: 'post-op.info',
      slug: 'post-op-info',
      scheme: 'post-op-info',
  
      extra: {
        firebaseProjectId: "post-opinfo",
        firebaseApiKey: "AIzaSyD9dp6g3lNL2V9bZdCsMXpQwEKSZM11oMg",
        firebaseAuthDomain: "post-opinfo.firebaseapp.com",
        firebaseStorageBucket: "post-opinfo.firebasestorage.app",
        firebaseMessagingSenderId: "5447406343",
        firebaseAppId: "1:5447406343:web:8f260c91707a9fdbf72ba2",
        firebaseMeasurementId: "G-T937ZDF3CF",
      },
  
      experiments: {
        newArchEnabled: true,
      },
  
      ios: {
        bundleIdentifier: 'com.yourcompany.postopinfo',
        supportsTablet: true,
      },
  
      android: {
        package: 'com.yourcompany.postopinfo',
        intentFilters: [
          {
            action: 'VIEW',
            data: {
              scheme: 'https',
              host: 'post-opinfo.firebaseapp.com',
              pathPrefix: '/__/auth',
            },
            category: ['BROWSABLE', 'DEFAULT'],
          },
          {
            action: 'VIEW',
            data: {
              scheme: 'post-op-info',
            },
            category: ['BROWSABLE', 'DEFAULT'],
          },
        ],
      },
    },
  };  
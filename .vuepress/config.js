import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress/cli'
import { viteBundler } from '@vuepress/bundler-vite'

//import { defineUserConfig } from 'vuepress'

export default defineUserConfig({
  lang: 'en-US',

  title: 'System Integrator (SI) Toolkit',
  tagline: 'Everything you need to know about Mojaloop System Integration',
  description: 'Everything you need to know about Mojaloop System Integration',
  base: '/system-integrator-toolkit/',


  theme: defaultTheme({
    logo: '/images/INFITX-Africa.png',
    logoDark: '/images/INFITX-Africa.png',
    logoAlt: 'Infitx Africa - System Integrator Toolkit',
    sidebarDepth: 3,
    editLink: false,
    lastUpdated: true,
    contributors: false,
    navbar: [
      {
        text: 'Getting Started',
        link: '/getting-started/',
      },
      {
        text: 'Business Integration',
        link: '/business-integration/',
      },
      {
        text: 'Technical Integration',
        link: '/technical-integration/',
      },
      {
        text: 'Payment Manager Guide',
        link: '/payment-manager-guide/',
      },
      {
        text: 'Deployment Guide',
        link: '/deployment-guide/',
      },
      {
        text: 'Technical Reference',
        link: '/technical-reference/',
      },
      {
        text: 'Mojaloop',
        link: 'https://mojaloop.io/',
        icon: 'svg:https://mojaloop.io/wp-content/uploads/2025/03/FullLogo_Standard_RGB.svg'
      }
    ],
    sidebar: {
      '/getting-started/': [
        {
          text: 'Getting Started',
          collapsible: false,
          collapsed: false,
          children: [
            'Introduction.md',
            'DfspGuide.md',
            'CustomerJourney.md',
            'TechnicalCollaboratorSkills.md',
            'MojaloopTrainingProgram.md'
          ]
        }
      ],
      '/business-integration/': [
        {
          text: 'Business Operations',
          collapsible: false,
          collapsed: false,
          children: [
            'BusinessOperations.md',
            'LiquidityDesign.md',
            'PaymentManager.md'
          ]
        },
        {
          text: 'Payment Processing',
          collapsible: false,
          collapsed: false,
          children: [
            'PaymentFlows.md',
            'ForeignExchangeProviders.md',
            'fees/Fees.md'
          ]
        },
        {
          text: 'Customer Management',
          collapsible: false,
          collapsed: false,
          children: [
            'CustomerIdentifiers.md'
          ]
        }
      ],
      '/technical-integration/': [
        {
          text: 'Technical Integration',
          collapsible: false,
          collapsed: false,
          children: [
            'TechnicalIntegration.md',
            'MojaloopConnector.md',
            'CoreConnectorTemplateDocs.md',
            'CoreConnectorBuildingGuide.md',
            'SDKClient.md',
            'ISO20022OptionalFields.md',
            'RoutingAndApiSpecifications.md'
          ]
        }
      ],
      '/payment-manager-guide/': [
        {
          text: 'Payment Manager User Guide',
          collapsible: false,
          collapsed: false,
          children: [
            'PaymentManager.md',
            'PM4ML_TransferOverview.md',
            'PM4ML_FXConversionsOverview.md',
            'PM4MLTechnicalDashboard.md'
          ]
        }
      ],
      '/deployment-guide/': [
        {
          text: 'Testing Harness',
          collapsible: false,
          collapsed: false,
          children: [
            'CoreConnectorTestingHarness.md'
          ]
        },
        {
          text: 'Payment Manager',
          collapsible: false,
          collapsed: false,
          children: [
            'payment-manager/Overview.md',
            'payment-manager/Guide.md',
            'payment-manager/CoreConnectorSetup.md',
            'payment-manager/DeployingDockerComposePayment.md',
            'payment-manager/ConfiguringACustomCoreConnector.md',
            'payment-manager/connectToLiveHub.md',
            'payment-manager/SecuringTheDockerDaemon.md',
            'payment-manager/firewallConfig.md',
            'payment-manager/TestTransfer.md'
          ]
        }
      ],
      '/technical-reference/': [
        {
          text: 'Cross-Currency Payments',
          collapsible: false,
          collapsed: false,
          children: [
            'currency-conversion/Cross-border (FX) Design.md'
          ]
        },
        {
          text: 'Inter-scheme Payments',
          collapsible: false,
          collapsed: false,
          children: [
            'inter-scheme/Readme.md'
          ]
        },
        {
          text: 'Integration Patterns & Architecture',
          collapsible: false,
          collapsed: false,
          children: [
            'IIPSDesignPatterns.md'
          ]
        },
        {
          text: 'API & Request Handling',
          collapsible: false,
          collapsed: false,
          children: [
            'RequestHandling.md',
            'ErrorHandling.md',
            'Service.md',
            'CoreConnectorAggregate.md'
          ]
        },
        {
          text: 'Configuration & Setup',
          collapsible: false,
          children: [
            'Configuration.md',
            'Networking.md',
            'CBSClient.md',
            'UploadIdentifiers.md'
          ]
        }
      ]
    }
  }),

  bundler: viteBundler({
    viteOptions: {},
    vuePluginOptions: {},
  }),

  head: [
    ['link', { rel: 'icon', href: '/images/INFITX-Africa.png' }],
    ['meta', { name: 'theme-color', content: '#1e3a8a' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
    ['meta', { name: 'msapplication-TileColor', content: '#1e3a8a' }]
  ],
})

import React from 'react';

const Toaster = React.lazy(() => import('./views/notifications/toaster/Toaster'));
const Tables = React.lazy(() => import('./views/base/tables/Tables'));

const Breadcrumbs = React.lazy(() => import('./views/base/breadcrumbs/Breadcrumbs'));
const Cards = React.lazy(() => import('./views/base/cards/Cards'));
const Carousels = React.lazy(() => import('./views/base/carousels/Carousels'));
const Collapses = React.lazy(() => import('./views/base/collapses/Collapses'));
const BasicForms = React.lazy(() => import('./views/base/forms/BasicForms'));

const Jumbotrons = React.lazy(() => import('./views/base/jumbotrons/Jumbotrons'));
const ListGroups = React.lazy(() => import('./views/base/list-groups/ListGroups'));
const Navbars = React.lazy(() => import('./views/base/navbars/Navbars'));
const Navs = React.lazy(() => import('./views/base/navs/Navs'));
const Paginations = React.lazy(() => import('./views/base/paginations/Pagnations'));
const Popovers = React.lazy(() => import('./views/base/popovers/Popovers'));
const ProgressBar = React.lazy(() => import('./views/base/progress-bar/ProgressBar'));
const Switches = React.lazy(() => import('./views/base/switches/Switches'));

const Tabs = React.lazy(() => import('./views/base/tabs/Tabs'));
const Tooltips = React.lazy(() => import('./views/base/tooltips/Tooltips'));
const BrandButtons = React.lazy(() => import('./views/buttons/brand-buttons/BrandButtons'));
const ButtonDropdowns = React.lazy(() => import('./views/buttons/button-dropdowns/ButtonDropdowns'));
const ButtonGroups = React.lazy(() => import('./views/buttons/button-groups/ButtonGroups'));
const Buttons = React.lazy(() => import('./views/buttons/buttons/Buttons'));
const Charts = React.lazy(() => import('./views/charts/Charts'));
const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'));
const CoreUIIcons = React.lazy(() => import('./views/icons/coreui-icons/CoreUIIcons'));
const Flags = React.lazy(() => import('./views/icons/flags/Flags'));
const Brands = React.lazy(() => import('./views/icons/brands/Brands'));
const Alerts = React.lazy(() => import('./views/notifications/alerts/Alerts'));
const Badges = React.lazy(() => import('./views/notifications/badges/Badges'));
const Modals = React.lazy(() => import('./views/notifications/modals/Modals'));
const Colors = React.lazy(() => import('./views/theme/colors/Colors'));
const Typography = React.lazy(() => import('./views/theme/typography/Typography'));
const Widgets = React.lazy(() => import('./views/widgets/Widgets'));

// Categories
const Category = React.lazy(() => import('./views/managements/categories/Category'));
const Categories = React.lazy(() => import('./views/managements/categories/Categories'));
const CreateCategory = React.lazy(() => import('./views/managements/categories/Create'));
const UpdateCategory = React.lazy(() => import('./views/managements/categories/Update'));

// Products
const Product = React.lazy(() => import('./views/managements/products/Product'));
const Products = React.lazy(() => import('./views/managements/products/Products'));
const CreateProduct = React.lazy(() => import('./views/managements/products/Create'));
const UpdateProduct = React.lazy(() => import('./views/managements/products/Update'));

// Users
const User = React.lazy(() => import('./views/managements/users/User'));
const Users = React.lazy(() => import('./views/managements/users/Users'));
const CreateUser = React.lazy(() => import('./views/managements/users/Create'));
const UpdateUser = React.lazy(() => import('./views/managements/users/Update'));
const UpdateUserAvatar = React.lazy(() => import('./views/managements/users/UploadAvatar'));

// Orders
const Order = React.lazy(() => import('./views/managements/orders/Order'));
const Orders = React.lazy(() => import('./views/managements/orders/Orders'));
const CreateOrder = React.lazy(() => import('./views/managements/orders/Create'));
const UpdateOrder = React.lazy(() => import('./views/managements/orders/Update'));

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/theme', name: 'Theme', component: Colors, exact: true },
  { path: '/theme/colors', name: 'Colors', component: Colors },
  { path: '/theme/typography', name: 'Typography', component: Typography },
  { path: '/base', name: 'Base', component: Cards, exact: true },
  { path: '/base/breadcrumbs', name: 'Breadcrumbs', component: Breadcrumbs },
  { path: '/base/cards', name: 'Cards', component: Cards },
  { path: '/base/carousels', name: 'Carousel', component: Carousels },
  { path: '/base/collapses', name: 'Collapse', component: Collapses },
  { path: '/base/forms', name: 'Forms', component: BasicForms },
  { path: '/base/jumbotrons', name: 'Jumbotrons', component: Jumbotrons },
  { path: '/base/list-groups', name: 'List Groups', component: ListGroups },
  { path: '/base/navbars', name: 'Navbars', component: Navbars },
  { path: '/base/navs', name: 'Navs', component: Navs },
  { path: '/base/paginations', name: 'Paginations', component: Paginations },
  { path: '/base/popovers', name: 'Popovers', component: Popovers },
  { path: '/base/progress-bar', name: 'Progress Bar', component: ProgressBar },
  { path: '/base/switches', name: 'Switches', component: Switches },
  { path: '/base/tables', name: 'Tables', component: Tables },
  { path: '/base/tabs', name: 'Tabs', component: Tabs },
  { path: '/base/tooltips', name: 'Tooltips', component: Tooltips },
  { path: '/buttons', name: 'Buttons', component: Buttons, exact: true },
  { path: '/buttons/buttons', name: 'Buttons', component: Buttons },
  { path: '/buttons/button-dropdowns', name: 'Dropdowns', component: ButtonDropdowns },
  { path: '/buttons/button-groups', name: 'Button Groups', component: ButtonGroups },
  { path: '/buttons/brand-buttons', name: 'Brand Buttons', component: BrandButtons },
  { path: '/charts', name: 'Charts', component: Charts },
  { path: '/icons', exact: true, name: 'Icons', component: CoreUIIcons },
  { path: '/icons/coreui-icons', name: 'CoreUI Icons', component: CoreUIIcons },
  { path: '/icons/flags', name: 'Flags', component: Flags },
  { path: '/icons/brands', name: 'Brands', component: Brands },
  { path: '/notifications', name: 'Notifications', component: Alerts, exact: true },
  { path: '/notifications/alerts', name: 'Alerts', component: Alerts },
  { path: '/notifications/badges', name: 'Badges', component: Badges },
  { path: '/notifications/modals', name: 'Modals', component: Modals },
  { path: '/notifications/toaster', name: 'Toaster', component: Toaster },
  { path: '/widgets', name: 'Widgets', component: Widgets },

  // Categories
  { path: '/managements/categories', exact: true, name: 'Categories', component: Categories},
  { path: '/managements/categories/create', exact: true, name: 'Create Category', component: CreateCategory },
  { path: '/managements/categories/:id/update', exact: true, name: 'Update Category', component: UpdateCategory },
  { path: '/managements/categories/:id', exact: true, name: 'Category Information', component: Category },
  // Products
  { path: '/managements/products', exact: true, name: 'Products', component: Products},
  { path: '/managements/products/create', exact: true, name: 'Create Product', component: CreateProduct },
  { path: '/managements/products/:id/update', exact: true, name: 'Update Product', component: UpdateProduct },
  { path: '/managements/products/:id', exact: true, name: 'Product Information', component: Product },
  // Users
  { path: '/managements/users', exact: true, name: 'Users', component: Users},
  { path: '/managements/users/create', exact: true, name: 'Create User', component: CreateUser },
  { path: '/managements/users/:id/update', exact: true, name: 'Update User', component: UpdateUser },
  { path: '/managements/users/:id', exact: true, name: 'User Information', component: User },
  { path: '/managements/users/:id/update-avatar', exact: true, name: 'Update Avatar User', component: UpdateUserAvatar},
  // Orders
  { path: '/managements/orders', exact: true, name: 'Orders', component: Orders},
  { path: '/managements/orders/create', exact: true, name: 'Create Order', component: CreateOrder },
  { path: '/managements/orders/:id/update', exact: true, name: 'Update Order', component: UpdateOrder },
  { path: '/managements/orders/:id', exact: true, name: 'Order Information', component: Order },
];

export default routes;

import {
  history,
  useAppData,
  useLocation,
  useOutlet,
  useRouteProps,
} from '@umijs/max';
import { ConfigProvider, Tabs } from 'antd';
import { useCallback, useEffect, useMemo, useState } from 'react';

const TabLayout = () => {
  const routeProps = useRouteProps();
  const location = useLocation();

  const outlet = useOutlet();

  const redirect = useMemo(() => {
    if (!routeProps.name) {
      return outlet;
    }
  }, [location]);

  const [init, setInit] = useState(true);
  const [routes, setRoutes] = useState<any>([]);
  // 获取当前路由信息

  const data: any = useAppData();
  const { clientRoutes } = data;

  const getAffix = useCallback((routes: []) => {
    let affixRoutes: any = [];
    for (let index = 0; index < routes.length; index++) {
      const item: any = routes[index];
      const { children, affix } = item;
      if (affix) {
        affixRoutes.push({
          closable: false,
          id: item.id,
          label: item.name,
          key: item.path,
          children: item.element,
        });
      }
      if (children && children.length > 0) {
        const childRoutes: any = getAffix(children);
        affixRoutes.push(...childRoutes);
      }
    }
    return affixRoutes;
  }, []);

  useEffect(() => {
    const { pathname } = location;
    const { name } = routeProps;
    const newRoutes = [...routes];

    if (init) {
      setInit(false);
      const affixRoutes = getAffix(clientRoutes);
      newRoutes.push(...affixRoutes);
    }

    // 判断当前路由是否存在
    if (!!name) {
      // 存在
      const index = newRoutes.findIndex((item: any) => item.key === pathname);
      if (index === -1) {
        // 新增
        newRoutes.push({
          id: routeProps.id,
          label: routeProps.name,
          key: routeProps.path,
          children: outlet,
        });
      }
    }

    setRoutes(newRoutes);
  }, [location]);

  return (
    <>
      <ConfigProvider
        theme={{
          components: {
            Tabs: {
              horizontalMargin: '16px 0px',
            },
          },
        }}
      >
        <Tabs
          size="small"
          hideAdd
          activeKey={routeProps.path}
          type="editable-card"
          items={routes}
          onTabClick={(key) => {
            history.push(key);
          }}
          onEdit={(targetKey: any, action) => {
            if (action === 'remove') {
              const tabRoutes: any = [...routes];
              const index = tabRoutes.findIndex(
                (item: any) => item.path === targetKey,
              );
              const total = tabRoutes?.length;
              if (targetKey === routeProps.path) {
                let redirectPath = '/';
                // 不是最后一个
                if (total - 1 > index) {
                  redirectPath = tabRoutes[index + 1]?.path;
                } else if (total - 1 === index && index > 0) {
                  redirectPath = tabRoutes[index - 1]?.path;
                }
                history.push(redirectPath);
              }

              tabRoutes.splice(index, 1);
              setRoutes(tabRoutes);
            }
          }}
        />
      </ConfigProvider>
      {redirect}
    </>
  );
};
export default TabLayout;

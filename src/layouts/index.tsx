import {
  history,
  useAppData,
  useModel,
  useOutlet,
  useRouteProps,
} from '@umijs/max';
import { ConfigProvider, Tabs } from 'antd';
import { useEffect, useMemo } from 'react';

const TabLayout = () => {
  const routeProps = useRouteProps();
  const outlet = useOutlet();

  const redirect = useMemo(() => {
    if (!routeProps.name) {
      return outlet
    }
  }, [routeProps]);


  const { initialState, setInitialState } = useModel('@@initialState');
  // 获取当前路由信息
  const routesArr: any[] = initialState?.tabRoutes || [];

  const data: any = useAppData();

  const getAffix = (routes: []) => {
    let affixRoutes: any = [];
    for (let index = 0; index < routes.length; index++) {
      const item: any = routes[index];
      const { children, affix } = item;
      if (affix) {
        affixRoutes.push(item);
      }
      if (children && children.length > 0) {
        const childRoutes: any = getAffix(children);
        affixRoutes.push(...childRoutes);
      }
    }
    return affixRoutes;
  };

  useEffect(() => {
    const { clientRoutes } = data;
    const affixRoutes = getAffix(clientRoutes);
    setInitialState((prevState) => ({
      ...prevState,
      tabRoutes: affixRoutes,
    }));
  }, []);

  useEffect(() => {
    const index = routesArr.findIndex(
      (item) => item?.path === routeProps?.path,
    );

    if (routeProps?.name) {
      const tabRoutes = [...routesArr];
      if (index > -1) {
        if (!tabRoutes[index]?.outlet) {
          tabRoutes[index] = { ...tabRoutes[index], element: outlet };
        }
      } else {
        tabRoutes.push({ ...routeProps, element: outlet });
      }
      setInitialState((preInitialState: any) => ({
        ...preInitialState,
        tabRoutes,
      }));
    }
  }, [routesArr, routeProps]);

  const defaultPanes = routesArr.map((item) => {
    return {
      label: item.name,
      key: item.path,
      closable: !item.affix,
      children: item.element,
    };
  });

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
          items={defaultPanes}
          onTabClick={(key) => {
            history.push(key);
          }}
          onEdit={(targetKey: any, action) => {
            if (action === 'remove') {
              const tabRoutes: any = [...routesArr];
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
              setInitialState((preInitialState: any) => ({
                ...preInitialState,
                tabRoutes,
              }));
            }
          }}
        />
      </ConfigProvider>
      {redirect}
    </>
  );
};
export default TabLayout;

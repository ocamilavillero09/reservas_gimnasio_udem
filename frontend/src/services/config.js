import { useEffect, useState } from 'react';
import { configApi } from './api';

/**
 * Constantes de negocio, traídas del backend (RNF06).
 *
 * La interfaz no guarda ninguna: ni los dominios institucionales, ni los
 * bloques horarios, ni el límite de inasistencias. Todas viven en un solo lugar,
 * el backend, y llegan aquí por el punto de configuración.
 *
 * Mientras la configuración no haya llegado, los componentes muestran el dato
 * vacío en vez de inventar un valor. Un número escrito a mano como respaldo
 * sería justo el problema que esto viene a resolver: si el backend cambiara el
 * límite, la interfaz seguiría enseñando el viejo sin que nadie se entere.
 */
let cache = null;
let enCurso = null;

export function cargarConfig() {
  if (cache) return Promise.resolve(cache);
  if (!enCurso) {
    enCurso = configApi.consultarConfiguracion()
      .then((c) => { cache = c; return c; })
      .catch((err) => { enCurso = null; throw err; });
  }
  return enCurso;
}

export function useConfig() {
  const [config, setConfig] = useState(cache);
  useEffect(() => {
    let vigente = true;
    cargarConfig().then((c) => { if (vigente) setConfig(c); }).catch(() => {});
    return () => { vigente = false; };
  }, []);
  return config;
}

/** RN01 — Rol que corresponde al dominio de un correo, según el backend. */
export function rolDeCorreo(config, email) {
  const correo = (email || '').trim().toLowerCase();
  return config?.dominios?.find((d) => correo.endsWith(d.dominio)) ?? null;
}

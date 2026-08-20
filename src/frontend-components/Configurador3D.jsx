import React, { useState, useCallback, useEffect } from 'react';
import { Unity, useUnityContext } from 'react-unity-webgl';
import './Configurador3D.css';

/**
 * Configurador3D — Componente reutilizable para el diseño 3D con Unity WebGL.
 *
 * Props:
 *  - clienteId (number): ID del cliente actual
 *  - pedidoId (number): ID del pedido al que se vinculará el diseño
 *  - apiBaseUrl (string): URL base del backend NestJS (ej: 'http://localhost:3000')
 *
 * Requisitos:
 *  - Instalar: npm install react-unity-webgl
 *  - Colocar los archivos de build de Unity en public/unity-build/Build/
 *
 * Comunicación Unity ↔ React:
 *  - React → Unity: sendMessage("GameManager", "ExportDesign") solicita el JSON
 *  - Unity → React: addEventListener("OnDesignExported", json) recibe el JSON exportado
 */
const Configurador3D = ({ clienteId, pedidoId, apiBaseUrl = 'http://localhost:3000' }) => {
  const [designName, setDesignName] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null); // 'success' | 'error' | null
  const [errorMessage, setErrorMessage] = useState('');

  const {
    unityProvider,
    sendMessage,
    addEventListener,
    removeEventListener,
    isLoaded,
    loadingProgression,
  } = useUnityContext({
    loaderUrl: '/unity-build/Build/Build.loader.js',
    dataUrl: '/unity-build/Build/Build.data',
    frameworkUrl: '/unity-build/Build/Build.framework.js',
    codeUrl: '/unity-build/Build/Build.wasm',
  });

  // Handler que recibe el JSON exportado desde Unity
  const handleDesignExported = useCallback(
    async (designJson) => {
      if (!designName.trim()) {
        setSaveStatus('error');
        setErrorMessage('Por favor, ingresa un nombre para el diseño.');
        return;
      }

      setIsSaving(true);
      setSaveStatus(null);
      setErrorMessage('');

      try {
        const response = await fetch(`${apiBaseUrl}/disenos`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            nombre: designName.trim(),
            configuracionJson: typeof designJson === 'string' ? designJson : JSON.stringify(designJson),
            pedidoId: pedidoId,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Error al guardar el diseño.');
        }

        setSaveStatus('success');
        setDesignName('');
      } catch (err) {
        setSaveStatus('error');
        setErrorMessage(err.message || 'Error de conexión con el servidor.');
      } finally {
        setIsSaving(false);
      }
    },
    [designName, pedidoId, apiBaseUrl],
  );

  // Suscribirse al evento de Unity
  useEffect(() => {
    addEventListener('OnDesignExported', handleDesignExported);
    return () => removeEventListener('OnDesignExported', handleDesignExported);
  }, [addEventListener, removeEventListener, handleDesignExported]);

  // Solicitar a Unity que exporte el diseño actual
  const handleSaveClick = () => {
    if (!designName.trim()) {
      setSaveStatus('error');
      setErrorMessage('Por favor, ingresa un nombre para el diseño.');
      return;
    }
    setSaveStatus(null);
    setErrorMessage('');
    // Envía mensaje al GameObject "GameManager" para que ejecute el método "ExportDesign"
    sendMessage('GameManager', 'ExportDesign');
  };

  const loadingPercentage = Math.round(loadingProgression * 100);

  return (
    <div className="configurador3d">
      <div className="configurador3d__header">
        <h2 className="configurador3d__title">🪑 Configurador de Muebles 3D</h2>
        <div className="configurador3d__meta">
          <span className="configurador3d__badge">Cliente #{clienteId}</span>
          <span className="configurador3d__badge configurador3d__badge--primary">
            Pedido #{pedidoId}
          </span>
        </div>
      </div>

      <div className="configurador3d__canvas-wrapper">
        {!isLoaded && (
          <div className="configurador3d__loader">
            <div className="configurador3d__loader-spinner" />
            <p className="configurador3d__loader-text">
              Cargando entorno 3D... {loadingPercentage}%
            </p>
            <div className="configurador3d__progress-bar">
              <div
                className="configurador3d__progress-fill"
                style={{ width: `${loadingPercentage}%` }}
              />
            </div>
          </div>
        )}
        <Unity
          unityProvider={unityProvider}
          className="configurador3d__canvas"
          style={{
            visibility: isLoaded ? 'visible' : 'hidden',
            width: '100%',
            height: '100%',
          }}
        />
      </div>

      <div className="configurador3d__controls">
        <div className="configurador3d__input-group">
          <label htmlFor="designName" className="configurador3d__label">
            Nombre del diseño
          </label>
          <input
            id="designName"
            type="text"
            className="configurador3d__input"
            placeholder="Ej: Mesa de roble — versión final"
            value={designName}
            onChange={(e) => setDesignName(e.target.value)}
            disabled={isSaving}
          />
        </div>

        <button
          className={`configurador3d__save-btn ${isSaving ? 'configurador3d__save-btn--saving' : ''}`}
          onClick={handleSaveClick}
          disabled={isSaving || !isLoaded}
        >
          {isSaving ? (
            <>
              <span className="configurador3d__btn-spinner" />
              Guardando...
            </>
          ) : (
            '💾 Guardar Diseño en el Pedido'
          )}
        </button>

        {saveStatus === 'success' && (
          <div className="configurador3d__alert configurador3d__alert--success">
            ✅ Diseño guardado y vinculado al pedido #{pedidoId} exitosamente.
          </div>
        )}

        {saveStatus === 'error' && (
          <div className="configurador3d__alert configurador3d__alert--error">
            ❌ {errorMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default Configurador3D;

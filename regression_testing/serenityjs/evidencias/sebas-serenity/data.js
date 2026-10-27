window.__SERENITY_REPORT_DATA__ = {
  "schemaVersion": 1,
  "summary": {
    "title": "serenityjs-e2e-screenplay",
    "totalScenarios": 4,
    "outcomes": {
      "passed": 4,
      "failed": 0,
      "pending": 0,
      "skipped": 0,
      "compromised": 0,
      "error": 0
    },
    "duration": 10572,
    "startedAt": "2026-10-27T05:25:28.133Z",
    "finishedAt": "2026-10-27T05:25:38.705Z",
    "testRunner": "Cucumber"
  },
  "scenarios": [
    {
      "name": "Reservar el bloque de las 06:00 desde el panel (RF07 exitoso)",
      "category": "E2E de navegador - reservas del estudiante y búsqueda del entrenador",
      "outcome": "SUCCESS",
      "duration": 3233,
      "startedAt": "2026-10-27T05:25:28.133Z",
      "source": {
        "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/sebas-e2e.feature",
        "line": 11
      },
      "tags": [
        {
          "type": "feature",
          "name": "E2E de navegador - reservas del estudiante y búsqueda del entrenador"
        },
        {
          "type": "tag",
          "name": "sebas-e2e"
        },
        {
          "type": "tag",
          "name": "rf06"
        },
        {
          "type": "tag",
          "name": "rf07"
        }
      ],
      "activities": [
        {
          "name": "Before",
          "outcome": "SUCCESS",
          "duration": 840,
          "children": [
            {
              "name": "Preparador se asegura de que exista la cuenta laura.est@soyudemedellin.edu.co",
              "outcome": "SUCCESS",
              "duration": 31,
              "children": [],
              "type": "Interaction",
              "startedAt": "2026-10-27T05:25:28.382Z",
              "location": {
                "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/sebas/actors.ts",
                "line": 37,
                "column": 22
              },
              "artifacts": [
                {
                  "path": "test-runs/2026-10-27T05-25-28.819Z/screenshot-win32-chromium-156-0-4314-42-preparador-se-asegura-de-que-exista-40ad070d69.png",
                  "type": "screenshot"
                }
              ]
            },
            {
              "name": "Preparador se asegura de que exista la cuenta tomas.coach@udem.edu.co",
              "outcome": "SUCCESS",
              "duration": 18,
              "children": [],
              "type": "Interaction",
              "startedAt": "2026-10-27T05:25:28.832Z",
              "location": {
                "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/sebas/actors.ts",
                "line": 38,
                "column": 22
              },
              "artifacts": [
                {
                  "path": "test-runs/2026-10-27T05-25-28.819Z/screenshot-win32-chromium-156-0-4314-42-preparador-se-asegura-de-que-exista-40ad070d69.png",
                  "type": "screenshot"
                }
              ]
            },
            {
              "name": "Preparador deja a laura.est@soyudemedellin.edu.co sin reservas activas",
              "outcome": "SUCCESS",
              "duration": 32,
              "children": [],
              "type": "Interaction",
              "startedAt": "2026-10-27T05:25:28.895Z",
              "location": {
                "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/sebas/actors.ts",
                "line": 39,
                "column": 30
              },
              "artifacts": [
                {
                  "path": "test-runs/2026-10-27T05-25-28.819Z/screenshot-win32-chromium-156-0-4314-42-preparador-deja-a-laura-est-soyudem-40ad070d69.png",
                  "type": "screenshot"
                }
              ]
            }
          ],
          "type": "Task",
          "startedAt": "2026-10-27T05:25:28.135Z",
          "location": {
            "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/sebas/actors.ts",
            "line": 27
          }
        },
        {
          "name": "Dado que Laura entró como estudiante",
          "outcome": "SUCCESS",
          "duration": 1139,
          "children": [
            {
              "name": "Laura inicia sesión como laura.est@soyudemedellin.edu.co",
              "outcome": "SUCCESS",
              "duration": 860,
              "children": [
                {
                  "name": "Laura navigates to \"http://localhost:5173\"",
                  "outcome": "SUCCESS",
                  "duration": 265,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-27T05:25:28.995Z",
                  "location": {
                    "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/step-definitions/sebas-e2e.steps.ts",
                    "line": 23,
                    "column": 54
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-27T05-25-28.819Z/screenshot-win32-chromium-156-0-4314-42-laura-navigates-to--http---localhos-e76461f043.png",
                      "type": "screenshot"
                    }
                  ]
                },
                {
                  "name": "Laura enters \"laura.est@soyudemedellin.edu.co\" into campo correo",
                  "outcome": "SUCCESS",
                  "duration": 27,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-27T05:25:29.524Z",
                  "location": {
                    "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/camila/tasks.ts",
                    "line": 15,
                    "column": 36
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-27T05-25-28.819Z/screenshot-win32-chromium-156-0-4314-42-laura-enters--laura-est-soyudemedel-fc2c61d24b.png",
                      "type": "screenshot"
                    }
                  ]
                },
                {
                  "name": "Laura enters \"1000000003\" into campo documento (contraseña)",
                  "outcome": "SUCCESS",
                  "duration": 11,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-27T05:25:29.630Z",
                  "location": {
                    "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/camila/tasks.ts",
                    "line": 16,
                    "column": 40
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-27T05-25-28.819Z/screenshot-win32-chromium-156-0-4314-42-laura-enters--1000000003--into-camp-fd19a82d9a.png",
                      "type": "screenshot"
                    }
                  ]
                },
                {
                  "name": "Laura clicks on botón ingresar",
                  "outcome": "SUCCESS",
                  "duration": 53,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-27T05:25:29.709Z",
                  "location": {
                    "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/camila/tasks.ts",
                    "line": 17,
                    "column": 13
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-27T05-25-28.819Z/screenshot-win32-chromium-156-0-4314-42-laura-clicks-on-bot-n-ingresar-a9fd44d6f3.png",
                      "type": "screenshot"
                    }
                  ]
                }
              ],
              "type": "Task",
              "startedAt": "2026-10-27T05:25:28.994Z",
              "location": {
                "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/step-definitions/sebas-e2e.steps.ts",
                "line": 23,
                "column": 54
              }
            },
            {
              "name": "Laura waits until lista de bloques horarios does become visible",
              "outcome": "SUCCESS",
              "duration": 112,
              "children": [],
              "type": "Interaction",
              "startedAt": "2026-10-27T05:25:29.868Z",
              "location": {
                "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/step-definitions/sebas-e2e.steps.ts",
                "line": 23,
                "column": 78
              },
              "artifacts": [
                {
                  "path": "test-runs/2026-10-27T05-25-28.819Z/screenshot-win32-chromium-156-0-4314-42-laura-waits-until-lista-de-bloques--b15c88de0c.png",
                  "type": "screenshot"
                }
              ]
            }
          ],
          "type": "Task",
          "startedAt": "2026-10-27T05:25:28.976Z",
          "location": {
            "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/sebas-e2e.feature",
            "line": 12
          }
        },
        {
          "name": "Cuando reserva el bloque 1 y confirma",
          "outcome": "SUCCESS",
          "duration": 794,
          "children": [
            {
              "name": "Laura reserva el bloque 1 y confirma",
              "outcome": "SUCCESS",
              "duration": 771,
              "children": [
                {
                  "name": "Laura waits until botón Reservar cupo del bloque 1 does become visible",
                  "outcome": "SUCCESS",
                  "duration": 48,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-27T05:25:30.124Z",
                  "location": {
                    "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/sebas/tasks.ts",
                    "line": 13,
                    "column": 7
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-27T05-25-28.819Z/screenshot-win32-chromium-156-0-4314-42-laura-waits-until-bot-n-reservar-cu-48fbc5751c.png",
                      "type": "screenshot"
                    }
                  ]
                },
                {
                  "name": "Laura clicks on botón Reservar cupo del bloque 1",
                  "outcome": "SUCCESS",
                  "duration": 209,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-27T05:25:30.248Z",
                  "location": {
                    "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/sebas/tasks.ts",
                    "line": 14,
                    "column": 13
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-27T05-25-28.819Z/screenshot-win32-chromium-156-0-4314-42-laura-clicks-on-bot-n-reservar-cupo-a9302702dd.png",
                      "type": "screenshot"
                    }
                  ]
                },
                {
                  "name": "Laura waits until botón Confirmar de la ventana de reserva does become visible",
                  "outcome": "SUCCESS",
                  "duration": 36,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-27T05:25:30.526Z",
                  "location": {
                    "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/sebas/tasks.ts",
                    "line": 15,
                    "column": 7
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-27T05-25-28.819Z/screenshot-win32-chromium-156-0-4314-42-laura-waits-until-bot-n-confirmar-d-b79fe2153f.png",
                      "type": "screenshot"
                    }
                  ]
                },
                {
                  "name": "Laura clicks on botón Confirmar de la ventana de reserva",
                  "outcome": "SUCCESS",
                  "duration": 205,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-27T05:25:30.621Z",
                  "location": {
                    "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/sebas/tasks.ts",
                    "line": 16,
                    "column": 13
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-27T05-25-28.819Z/screenshot-win32-chromium-156-0-4314-42-laura-clicks-on-bot-n-confirmar-de--9286f28ce2.png",
                      "type": "screenshot"
                    }
                  ]
                }
              ],
              "type": "Task",
              "startedAt": "2026-10-27T05:25:30.123Z",
              "location": {
                "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/step-definitions/sebas-e2e.steps.ts",
                "line": 32,
                "column": 59
              }
            }
          ],
          "type": "Task",
          "startedAt": "2026-10-27T05:25:30.116Z",
          "location": {
            "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/sebas-e2e.feature",
            "line": 13
          }
        },
        {
          "name": "Entonces su contador de reservas de mañana debe mostrar \"1/1\"",
          "outcome": "SUCCESS",
          "duration": 109,
          "children": [
            {
              "name": "Laura ensures that the text of contador Mi reserva de mañana does eventually equal \"1/1\"",
              "outcome": "SUCCESS",
              "duration": 21,
              "children": [],
              "type": "Interaction",
              "startedAt": "2026-10-27T05:25:30.918Z",
              "location": {
                "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/step-definitions/sebas-e2e.steps.ts",
                "line": 36,
                "column": 49
              },
              "artifacts": [
                {
                  "path": "test-runs/2026-10-27T05-25-28.819Z/screenshot-win32-chromium-156-0-4314-42-laura-ensures-that-the-text-of-cont-0a1655a630.png",
                  "type": "screenshot"
                }
              ]
            }
          ],
          "type": "Task",
          "startedAt": "2026-10-27T05:25:30.910Z",
          "location": {
            "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/sebas-e2e.feature",
            "line": 14
          }
        },
        {
          "name": "Y el bloque 1 debe quedar marcado como reservado",
          "outcome": "SUCCESS",
          "duration": 124,
          "children": [
            {
              "name": "Laura ensures that etiqueta Reservado del bloque 1 does eventually become visible",
              "outcome": "SUCCESS",
              "duration": 49,
              "children": [],
              "type": "Interaction",
              "startedAt": "2026-10-27T05:25:31.025Z",
              "location": {
                "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/step-definitions/sebas-e2e.steps.ts",
                "line": 40,
                "column": 49
              },
              "artifacts": [
                {
                  "path": "test-runs/2026-10-27T05-25-28.819Z/screenshot-win32-chromium-156-0-4314-42-laura-ensures-that-etiqueta-reserva-a5cd0934f5.png",
                  "type": "screenshot"
                }
              ]
            }
          ],
          "type": "Task",
          "startedAt": "2026-10-27T05:25:31.020Z",
          "location": {
            "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/sebas-e2e.feature",
            "line": 15
          }
        },
        {
          "name": "Y la reserva de mañana de Laura debe quedar \"ACTIVA\" en la base de datos",
          "outcome": "SUCCESS",
          "duration": 111,
          "children": [
            {
              "name": "Laura ensures that el estado de la reserva de mañana de laura.est@soyudemedellin.edu.co does eventually equal \"ACTIVA\"",
              "outcome": "SUCCESS",
              "duration": 32,
              "children": [],
              "type": "Interaction",
              "startedAt": "2026-10-27T05:25:31.148Z",
              "location": {
                "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/step-definitions/sebas-e2e.steps.ts",
                "line": 45,
                "column": 12
              },
              "artifacts": [
                {
                  "path": "test-runs/2026-10-27T05-25-28.819Z/screenshot-win32-chromium-156-0-4314-42-laura-ensures-that-el-estado-de-la--6c74c71dcb.png",
                  "type": "screenshot"
                }
              ]
            }
          ],
          "type": "Task",
          "startedAt": "2026-10-27T05:25:31.145Z",
          "location": {
            "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/sebas-e2e.feature",
            "line": 16
          }
        },
        {
          "name": "After",
          "outcome": "SUCCESS",
          "duration": 12,
          "children": [],
          "type": "Task",
          "startedAt": "2026-10-27T05:25:31.256Z",
          "location": {
            "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/sebas/actors.ts",
            "line": 43
          }
        }
      ],
      "executionHistory": [
        {
          "outcome": "SUCCESS",
          "run": "2026-10-27T05-21-21.384Z",
          "timestamp": "2026-10-27T05:21:21.207Z",
          "duration": 4515,
          "activities": [
            {
              "name": "Before",
              "outcome": "SUCCESS",
              "duration": 877,
              "children": [
                {
                  "name": "Preparador se asegura de que exista la cuenta laura.est@soyudemedellin.edu.co",
                  "outcome": "SUCCESS",
                  "duration": 10,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-27T05:21:27.305Z",
                  "location": {
                    "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/sebas/actors.ts",
                    "line": 37,
                    "column": 22
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-27T05-21-21.384Z/screenshot-win32-chromium-156-0-4314-42-preparador-se-asegura-de-que-exista-40ad070d69.png",
                      "type": "screenshot"
                    }
                  ]
                },
                {
                  "name": "Preparador se asegura de que exista la cuenta tomas.coach@udem.edu.co",
                  "outcome": "SUCCESS",
                  "duration": 19,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-27T05:21:27.780Z",
                  "location": {
                    "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/sebas/actors.ts",
                    "line": 38,
                    "column": 22
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-27T05-21-21.384Z/screenshot-win32-chromium-156-0-4314-42-preparador-se-asegura-de-que-exista-40ad070d69.png",
                      "type": "screenshot"
                    }
                  ]
                },
                {
                  "name": "Preparador deja a laura.est@soyudemedellin.edu.co sin reservas activas",
                  "outcome": "SUCCESS",
                  "duration": 12,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-27T05:21:27.838Z",
                  "location": {
                    "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/sebas/actors.ts",
                    "line": 39,
                    "column": 30
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-27T05-21-21.384Z/screenshot-win32-chromium-156-0-4314-42-preparador-deja-a-laura-est-soyudem-40ad070d69.png",
                      "type": "screenshot"
                    }
                  ]
                }
              ],
              "type": "Task",
              "startedAt": "2026-10-27T05:21:27.030Z",
              "location": {
                "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/sebas/actors.ts",
                "line": 27
              }
            },
            {
              "name": "Dado que Laura entró como estudiante",
              "outcome": "SUCCESS",
              "duration": 2381,
              "children": [
                {
                  "name": "Laura inicia sesión como laura.est@soyudemedellin.edu.co",
                  "outcome": "SUCCESS",
                  "duration": 2147,
                  "children": [
                    {
                      "name": "Laura navigates to \"http://localhost:5173\"",
                      "outcome": "SUCCESS",
                      "duration": 1498,
                      "children": [],
                      "type": "Interaction",
                      "startedAt": "2026-10-27T05:21:27.920Z",
                      "location": {
                        "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/step-definitions/sebas-e2e.steps.ts",
                        "line": 23,
                        "column": 54
                      },
                      "artifacts": [
                        {
                          "path": "test-runs/2026-10-27T05-21-21.384Z/screenshot-win32-chromium-156-0-4314-42-laura-navigates-to--http---localhos-c9bae3bacb.png",
                          "type": "screenshot"
                        }
                      ]
                    },
                    {
                      "name": "Laura enters \"laura.est@soyudemedellin.edu.co\" into campo correo",
                      "outcome": "SUCCESS",
                      "duration": 29,
                      "children": [],
                      "type": "Interaction",
                      "startedAt": "2026-10-27T05:21:29.690Z",
                      "location": {
                        "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/camila/tasks.ts",
                        "line": 15,
                        "column": 36
                      },
                      "artifacts": [
                        {
                          "path": "test-runs/2026-10-27T05-21-21.384Z/screenshot-win32-chromium-156-0-4314-42-laura-enters--laura-est-soyudemedel-e5b709c1ed.png",
                          "type": "screenshot"
                        }
                      ]
                    },
                    {
                      "name": "Laura enters \"1000000003\" into campo documento (contraseña)",
                      "outcome": "SUCCESS",
                      "duration": 14,
                      "children": [],
                      "type": "Interaction",
                      "startedAt": "2026-10-27T05:21:29.816Z",
                      "location": {
                        "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/camila/tasks.ts",
                        "line": 16,
                        "column": 40
                      },
                      "artifacts": [
                        {
                          "path": "test-runs/2026-10-27T05-21-21.384Z/screenshot-win32-chromium-156-0-4314-42-laura-enters--1000000003--into-camp-04521d54a7.png",
                          "type": "screenshot"
                        }
                      ]
                    },
                    {
                      "name": "Laura clicks on botón ingresar",
                      "outcome": "SUCCESS",
                      "duration": 58,
                      "children": [],
                      "type": "Interaction",
                      "startedAt": "2026-10-27T05:21:29.911Z",
                      "location": {
                        "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/camila/tasks.ts",
                        "line": 17,
                        "column": 13
                      },
                      "artifacts": [
                        {
                          "path": "test-runs/2026-10-27T05-21-21.384Z/screenshot-win32-chromium-156-0-4314-42-laura-clicks-on-bot-n-ingresar-34804c3b02.png",
                          "type": "screenshot"
                        }
                      ]
                    }
                  ],
                  "type": "Task",
                  "startedAt": "2026-10-27T05:21:27.920Z",
                  "location": {
                    "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/step-definitions/sebas-e2e.steps.ts",
                    "line": 23,
                    "column": 54
                  }
                },
                {
                  "name": "Laura waits until lista de bloques horarios does become visible",
                  "outcome": "SUCCESS",
                  "duration": 114,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-27T05:21:30.077Z",
                  "location": {
                    "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/step-definitions/sebas-e2e.steps.ts",
                    "line": 23,
                    "column": 78
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-27T05-21-21.384Z/screenshot-win32-chromium-156-0-4314-42-laura-waits-until-lista-de-bloques--804c7765f3.png",
                      "type": "screenshot"
                    }
                  ]
                }
              ],
              "type": "Task",
              "startedAt": "2026-10-27T05:21:27.907Z",
              "location": {
                "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/sebas-e2e.feature",
                "line": 12
              }
            },
            {
              "name": "Cuando reserva el bloque 1 y confirma",
              "outcome": "SUCCESS",
              "duration": 828,
              "children": [
                {
                  "name": "Laura reserva el bloque 1 y confirma",
                  "outcome": "SUCCESS",
                  "duration": 802,
                  "children": [
                    {
                      "name": "Laura waits until botón Reservar cupo del bloque 1 does become visible",
                      "outcome": "SUCCESS",
                      "duration": 35,
                      "children": [],
                      "type": "Interaction",
                      "startedAt": "2026-10-27T05:21:30.299Z",
                      "location": {
                        "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/sebas/tasks.ts",
                        "line": 13,
                        "column": 7
                      },
                      "artifacts": [
                        {
                          "path": "test-runs/2026-10-27T05-21-21.384Z/screenshot-win32-chromium-156-0-4314-42-laura-waits-until-bot-n-reservar-cu-0d2a5ada4f.png",
                          "type": "screenshot"
                        }
                      ]
                    },
                    {
                      "name": "Laura clicks on botón Reservar cupo del bloque 1",
                      "outcome": "SUCCESS",
                      "duration": 322,
                      "children": [],
                      "type": "Interaction",
                      "startedAt": "2026-10-27T05:21:30.397Z",
                      "location": {
                        "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/sebas/tasks.ts",
                        "line": 14,
                        "column": 13
                      },
                      "artifacts": [
                        {
                          "path": "test-runs/2026-10-27T05-21-21.384Z/screenshot-win32-chromium-156-0-4314-42-laura-clicks-on-bot-n-reservar-cupo-401e60fe4a.png",
                          "type": "screenshot"
                        }
                      ]
                    },
                    {
                      "name": "Laura waits until botón Confirmar de la ventana de reserva does become visible",
                      "outcome": "SUCCESS",
                      "duration": 30,
                      "children": [],
                      "type": "Interaction",
                      "startedAt": "2026-10-27T05:21:30.819Z",
                      "location": {
                        "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/sebas/tasks.ts",
                        "line": 15,
                        "column": 7
                      },
                      "artifacts": [
                        {
                          "path": "test-runs/2026-10-27T05-21-21.384Z/screenshot-win32-chromium-156-0-4314-42-laura-waits-until-bot-n-confirmar-d-90ba91cad4.png",
                          "type": "screenshot"
                        }
                      ]
                    },
                    {
                      "name": "Laura clicks on botón Confirmar de la ventana de reserva",
                      "outcome": "SUCCESS",
                      "duration": 85,
                      "children": [],
                      "type": "Interaction",
                      "startedAt": "2026-10-27T05:21:30.930Z",
                      "location": {
                        "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/sebas/tasks.ts",
                        "line": 16,
                        "column": 13
                      },
                      "artifacts": [
                        {
                          "path": "test-runs/2026-10-27T05-21-21.384Z/screenshot-win32-chromium-156-0-4314-42-laura-clicks-on-bot-n-confirmar-de--765a1982a8.png",
                          "type": "screenshot"
                        }
                      ]
                    }
                  ],
                  "type": "Task",
                  "startedAt": "2026-10-27T05:21:30.299Z",
                  "location": {
                    "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/step-definitions/sebas-e2e.steps.ts",
                    "line": 32,
                    "column": 59
                  }
                }
              ],
              "type": "Task",
              "startedAt": "2026-10-27T05:21:30.289Z",
              "location": {
                "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/sebas-e2e.feature",
                "line": 13
              }
            },
            {
              "name": "Entonces su contador de reservas de mañana debe mostrar \"1/1\"",
              "outcome": "SUCCESS",
              "duration": 128,
              "children": [
                {
                  "name": "Laura ensures that the text of contador Mi reserva de mañana does eventually equal \"1/1\"",
                  "outcome": "SUCCESS",
                  "duration": 30,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-27T05:21:31.123Z",
                  "location": {
                    "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/step-definitions/sebas-e2e.steps.ts",
                    "line": 36,
                    "column": 49
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-27T05-21-21.384Z/screenshot-win32-chromium-156-0-4314-42-laura-ensures-that-the-text-of-cont-f81a0e6c9d.png",
                      "type": "screenshot"
                    }
                  ]
                }
              ],
              "type": "Task",
              "startedAt": "2026-10-27T05:21:31.117Z",
              "location": {
                "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/sebas-e2e.feature",
                "line": 14
              }
            },
            {
              "name": "Y el bloque 1 debe quedar marcado como reservado",
              "outcome": "SUCCESS",
              "duration": 90,
              "children": [
                {
                  "name": "Laura ensures that etiqueta Reservado del bloque 1 does eventually become visible",
                  "outcome": "SUCCESS",
                  "duration": 25,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-27T05:21:31.248Z",
                  "location": {
                    "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/step-definitions/sebas-e2e.steps.ts",
                    "line": 40,
                    "column": 49
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-27T05-21-21.384Z/screenshot-win32-chromium-156-0-4314-42-laura-ensures-that-etiqueta-reserva-0d816a3ee9.png",
                      "type": "screenshot"
                    }
                  ]
                }
              ],
              "type": "Task",
              "startedAt": "2026-10-27T05:21:31.245Z",
              "location": {
                "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/sebas-e2e.feature",
                "line": 15
              }
            },
            {
              "name": "Y la reserva de mañana de Laura debe quedar \"ACTIVA\" en la base de datos",
              "outcome": "SUCCESS",
              "duration": 114,
              "children": [
                {
                  "name": "Laura ensures that el estado de la reserva de mañana de laura.est@soyudemedellin.edu.co does eventually equal \"ACTIVA\"",
                  "outcome": "SUCCESS",
                  "duration": 38,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-27T05:21:31.338Z",
                  "location": {
                    "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/step-definitions/sebas-e2e.steps.ts",
                    "line": 45,
                    "column": 12
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-27T05-21-21.384Z/screenshot-win32-chromium-156-0-4314-42-laura-ensures-that-el-estado-de-la--c182e685b9.png",
                      "type": "screenshot"
                    }
                  ]
                }
              ],
              "type": "Task",
              "startedAt": "2026-10-27T05:21:31.335Z",
              "location": {
                "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/sebas-e2e.feature",
                "line": 16
              }
            },
            {
              "name": "After",
              "outcome": "SUCCESS",
              "duration": 9,
              "children": [],
              "type": "Task",
              "startedAt": "2026-10-27T05:21:31.450Z",
              "location": {
                "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/sebas/actors.ts",
                "line": 43
              }
            }
          ]
        },
        {
          "outcome": "SUCCESS",
          "run": "2026-10-27T05-25-28.819Z",
          "timestamp": "2026-10-27T05:25:28.133Z",
          "duration": 3233,
          "activities": [
            {
              "name": "Before",
              "outcome": "SUCCESS",
              "duration": 840,
              "children": [
                {
                  "name": "Preparador se asegura de que exista la cuenta laura.est@soyudemedellin.edu.co",
                  "outcome": "SUCCESS",
                  "duration": 31,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-27T05:25:28.382Z",
                  "location": {
                    "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/sebas/actors.ts",
                    "line": 37,
                    "column": 22
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-27T05-25-28.819Z/screenshot-win32-chromium-156-0-4314-42-preparador-se-asegura-de-que-exista-40ad070d69.png",
                      "type": "screenshot"
                    }
                  ]
                },
                {
                  "name": "Preparador se asegura de que exista la cuenta tomas.coach@udem.edu.co",
                  "outcome": "SUCCESS",
                  "duration": 18,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-27T05:25:28.832Z",
                  "location": {
                    "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/sebas/actors.ts",
                    "line": 38,
                    "column": 22
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-27T05-25-28.819Z/screenshot-win32-chromium-156-0-4314-42-preparador-se-asegura-de-que-exista-40ad070d69.png",
                      "type": "screenshot"
                    }
                  ]
                },
                {
                  "name": "Preparador deja a laura.est@soyudemedellin.edu.co sin reservas activas",
                  "outcome": "SUCCESS",
                  "duration": 32,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-27T05:25:28.895Z",
                  "location": {
                    "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/sebas/actors.ts",
                    "line": 39,
                    "column": 30
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-27T05-25-28.819Z/screenshot-win32-chromium-156-0-4314-42-preparador-deja-a-laura-est-soyudem-40ad070d69.png",
                      "type": "screenshot"
                    }
                  ]
                }
              ],
              "type": "Task",
              "startedAt": "2026-10-27T05:25:28.135Z",
              "location": {
                "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/sebas/actors.ts",
                "line": 27
              }
            },
            {
              "name": "Dado que Laura entró como estudiante",
              "outcome": "SUCCESS",
              "duration": 1139,
              "children": [
                {
                  "name": "Laura inicia sesión como laura.est@soyudemedellin.edu.co",
                  "outcome": "SUCCESS",
                  "duration": 860,
                  "children": [
                    {
                      "name": "Laura navigates to \"http://localhost:5173\"",
                      "outcome": "SUCCESS",
                      "duration": 265,
                      "children": [],
                      "type": "Interaction",
                      "startedAt": "2026-10-27T05:25:28.995Z",
                      "location": {
                        "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/step-definitions/sebas-e2e.steps.ts",
                        "line": 23,
                        "column": 54
                      },
                      "artifacts": [
                        {
                          "path": "test-runs/2026-10-27T05-25-28.819Z/screenshot-win32-chromium-156-0-4314-42-laura-navigates-to--http---localhos-e76461f043.png",
                          "type": "screenshot"
                        }
                      ]
                    },
                    {
                      "name": "Laura enters \"laura.est@soyudemedellin.edu.co\" into campo correo",
                      "outcome": "SUCCESS",
                      "duration": 27,
                      "children": [],
                      "type": "Interaction",
                      "startedAt": "2026-10-27T05:25:29.524Z",
                      "location": {
                        "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/camila/tasks.ts",
                        "line": 15,
                        "column": 36
                      },
                      "artifacts": [
                        {
                          "path": "test-runs/2026-10-27T05-25-28.819Z/screenshot-win32-chromium-156-0-4314-42-laura-enters--laura-est-soyudemedel-fc2c61d24b.png",
                          "type": "screenshot"
                        }
                      ]
                    },
                    {
                      "name": "Laura enters \"1000000003\" into campo documento (contraseña)",
                      "outcome": "SUCCESS",
                      "duration": 11,
                      "children": [],
                      "type": "Interaction",
                      "startedAt": "2026-10-27T05:25:29.630Z",
                      "location": {
                        "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/camila/tasks.ts",
                        "line": 16,
                        "column": 40
                      },
                      "artifacts": [
                        {
                          "path": "test-runs/2026-10-27T05-25-28.819Z/screenshot-win32-chromium-156-0-4314-42-laura-enters--1000000003--into-camp-fd19a82d9a.png",
                          "type": "screenshot"
                        }
                      ]
                    },
                    {
                      "name": "Laura clicks on botón ingresar",
                      "outcome": "SUCCESS",
                      "duration": 53,
                      "children": [],
                      "type": "Interaction",
                      "startedAt": "2026-10-27T05:25:29.709Z",
                      "location": {
                        "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/camila/tasks.ts",
                        "line": 17,
                        "column": 13
                      },
                      "artifacts": [
                        {
                          "path": "test-runs/2026-10-27T05-25-28.819Z/screenshot-win32-chromium-156-0-4314-42-laura-clicks-on-bot-n-ingresar-a9fd44d6f3.png",
                          "type": "screenshot"
                        }
                      ]
                    }
                  ],
                  "type": "Task",
                  "startedAt": "2026-10-27T05:25:28.994Z",
                  "location": {
                    "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/step-definitions/sebas-e2e.steps.ts",
                    "line": 23,
                    "column": 54
                  }
                },
                {
                  "name": "Laura waits until lista de bloques horarios does become visible",
                  "outcome": "SUCCESS",
                  "duration": 112,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-27T05:25:29.868Z",
                  "location": {
                    "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/step-definitions/sebas-e2e.steps.ts",
                    "line": 23,
                    "column": 78
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-27T05-25-28.819Z/screenshot-win32-chromium-156-0-4314-42-laura-waits-until-lista-de-bloques--b15c88de0c.png",
                      "type": "screenshot"
                    }
                  ]
                }
              ],
              "type": "Task",
              "startedAt": "2026-10-27T05:25:28.976Z",
              "location": {
                "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/sebas-e2e.feature",
                "line": 12
              }
            },
            {
              "name": "Cuando reserva el bloque 1 y confirma",
              "outcome": "SUCCESS",
              "duration": 794,
              "children": [
                {
                  "name": "Laura reserva el bloque 1 y confirma",
                  "outcome": "SUCCESS",
                  "duration": 771,
                  "children": [
                    {
                      "name": "Laura waits until botón Reservar cupo del bloque 1 does become visible",
                      "outcome": "SUCCESS",
                      "duration": 48,
                      "children": [],
                      "type": "Interaction",
                      "startedAt": "2026-10-27T05:25:30.124Z",
                      "location": {
                        "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/sebas/tasks.ts",
                        "line": 13,
                        "column": 7
                      },
                      "artifacts": [
                        {
                          "path": "test-runs/2026-10-27T05-25-28.819Z/screenshot-win32-chromium-156-0-4314-42-laura-waits-until-bot-n-reservar-cu-48fbc5751c.png",
                          "type": "screenshot"
                        }
                      ]
                    },
                    {
                      "name": "Laura clicks on botón Reservar cupo del bloque 1",
                      "outcome": "SUCCESS",
                      "duration": 209,
                      "children": [],
                      "type": "Interaction",
                      "startedAt": "2026-10-27T05:25:30.248Z",
                      "location": {
                        "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/sebas/tasks.ts",
                        "line": 14,
                        "column": 13
                      },
                      "artifacts": [
                        {
                          "path": "test-runs/2026-10-27T05-25-28.819Z/screenshot-win32-chromium-156-0-4314-42-laura-clicks-on-bot-n-reservar-cupo-a9302702dd.png",
                          "type": "screenshot"
                        }
                      ]
                    },
                    {
                      "name": "Laura waits until botón Confirmar de la ventana de reserva does become visible",
                      "outcome": "SUCCESS",
                      "duration": 36,
                      "children": [],
                      "type": "Interaction",
                      "startedAt": "2026-10-27T05:25:30.526Z",
                      "location": {
                        "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/sebas/tasks.ts",
                        "line": 15,
                        "column": 7
                      },
                      "artifacts": [
                        {
                          "path": "test-runs/2026-10-27T05-25-28.819Z/screenshot-win32-chromium-156-0-4314-42-laura-waits-until-bot-n-confirmar-d-b79fe2153f.png",
                          "type": "screenshot"
                        }
                      ]
                    },
                    {
                      "name": "Laura clicks on botón Confirmar de la ventana de reserva",
                      "outcome": "SUCCESS",
                      "duration": 205,
                      "children": [],
                      "type": "Interaction",
                      "startedAt": "2026-10-27T05:25:30.621Z",
                      "location": {
                        "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/sebas/tasks.ts",
                        "line": 16,
                        "column": 13
                      },
                      "artifacts": [
                        {
                          "path": "test-runs/2026-10-27T05-25-28.819Z/screenshot-win32-chromium-156-0-4314-42-laura-clicks-on-bot-n-confirmar-de--9286f28ce2.png",
                          "type": "screenshot"
                        }
                      ]
                    }
                  ],
                  "type": "Task",
                  "startedAt": "2026-10-27T05:25:30.123Z",
                  "location": {
                    "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/step-definitions/sebas-e2e.steps.ts",
                    "line": 32,
                    "column": 59
                  }
                }
              ],
              "type": "Task",
              "startedAt": "2026-10-27T05:25:30.116Z",
              "location": {
                "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/sebas-e2e.feature",
                "line": 13
              }
            },
            {
              "name": "Entonces su contador de reservas de mañana debe mostrar \"1/1\"",
              "outcome": "SUCCESS",
              "duration": 109,
              "children": [
                {
                  "name": "Laura ensures that the text of contador Mi reserva de mañana does eventually equal \"1/1\"",
                  "outcome": "SUCCESS",
                  "duration": 21,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-27T05:25:30.918Z",
                  "location": {
                    "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/step-definitions/sebas-e2e.steps.ts",
                    "line": 36,
                    "column": 49
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-27T05-25-28.819Z/screenshot-win32-chromium-156-0-4314-42-laura-ensures-that-the-text-of-cont-0a1655a630.png",
                      "type": "screenshot"
                    }
                  ]
                }
              ],
              "type": "Task",
              "startedAt": "2026-10-27T05:25:30.910Z",
              "location": {
                "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/sebas-e2e.feature",
                "line": 14
              }
            },
            {
              "name": "Y el bloque 1 debe quedar marcado como reservado",
              "outcome": "SUCCESS",
              "duration": 124,
              "children": [
                {
                  "name": "Laura ensures that etiqueta Reservado del bloque 1 does eventually become visible",
                  "outcome": "SUCCESS",
                  "duration": 49,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-27T05:25:31.025Z",
                  "location": {
                    "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/step-definitions/sebas-e2e.steps.ts",
                    "line": 40,
                    "column": 49
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-27T05-25-28.819Z/screenshot-win32-chromium-156-0-4314-42-laura-ensures-that-etiqueta-reserva-a5cd0934f5.png",
                      "type": "screenshot"
                    }
                  ]
                }
              ],
              "type": "Task",
              "startedAt": "2026-10-27T05:25:31.020Z",
              "location": {
                "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/sebas-e2e.feature",
                "line": 15
              }
            },
            {
              "name": "Y la reserva de mañana de Laura debe quedar \"ACTIVA\" en la base de datos",
              "outcome": "SUCCESS",
              "duration": 111,
              "children": [
                {
                  "name": "Laura ensures that el estado de la reserva de mañana de laura.est@soyudemedellin.edu.co does eventually equal \"ACTIVA\"",
                  "outcome": "SUCCESS",
                  "duration": 32,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-27T05:25:31.148Z",
                  "location": {
                    "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/step-definitions/sebas-e2e.steps.ts",
                    "line": 45,
                    "column": 12
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-27T05-25-28.819Z/screenshot-win32-chromium-156-0-4314-42-laura-ensures-that-el-estado-de-la--6c74c71dcb.png",
                      "type": "screenshot"
                    }
                  ]
                }
              ],
              "type": "Task",
              "startedAt": "2026-10-27T05:25:31.145Z",
              "location": {
                "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/sebas-e2e.feature",
                "line": 16
              }
            },
            {
              "name": "After",
              "outcome": "SUCCESS",
              "duration": 12,
              "children": [],
              "type": "Task",
              "startedAt": "2026-10-27T05:25:31.256Z",
              "location": {
                "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/sebas/actors.ts",
                "line": 43
              }
            }
          ]
        }
      ],
      "narrative": "<p>Como estudiante o entrenador del gimnasio UdeM\nQuiero usar la interfaz web\nPara comprobar de punta a punta RF06, RF07, RF08, RF09 y RF10</p>\n",
      "cast": [
        {
          "name": "Preparador",
          "abilities": [
            {
              "name": "PerformActivities"
            },
            {
              "name": "AnswerQuestions"
            },
            {
              "name": "RaiseErrors"
            },
            {
              "name": "ScheduleWork",
              "details": "{\"scheduler\":{\"clock\":{\"timeAdjustment\":{\"milliseconds\":0}},\"interactionTimeout\":{\"milliseconds\":5000}}}"
            },
            {
              "name": "BrowseTheWebWithPlaywright"
            },
            {
              "name": "ConsultarLaBaseDeDatos"
            }
          ]
        },
        {
          "name": "Laura",
          "abilities": [
            {
              "name": "PerformActivities"
            },
            {
              "name": "AnswerQuestions"
            },
            {
              "name": "RaiseErrors"
            },
            {
              "name": "ScheduleWork",
              "details": "{\"scheduler\":{\"clock\":{\"timeAdjustment\":{\"milliseconds\":0}},\"interactionTimeout\":{\"milliseconds\":5000}}}"
            },
            {
              "name": "BrowseTheWebWithPlaywright"
            },
            {
              "name": "ConsultarLaBaseDeDatos"
            }
          ]
        }
      ],
      "id": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/sebas-e2e.feature:11"
    },
    {
      "name": "Consultar y cancelar la reserva activa desde Mis reservas (RF08 y RF09 exitoso)",
      "category": "E2E de navegador - reservas del estudiante y búsqueda del entrenador",
      "outcome": "SUCCESS",
      "duration": 2986,
      "startedAt": "2026-10-27T05:25:31.377Z",
      "source": {
        "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/sebas-e2e.feature",
        "line": 20
      },
      "tags": [
        {
          "type": "feature",
          "name": "E2E de navegador - reservas del estudiante y búsqueda del entrenador"
        },
        {
          "type": "tag",
          "name": "sebas-e2e"
        },
        {
          "type": "tag",
          "name": "rf08"
        },
        {
          "type": "tag",
          "name": "rf09"
        }
      ],
      "activities": [
        {
          "name": "Before",
          "outcome": "SUCCESS",
          "duration": 366,
          "children": [
            {
              "name": "Preparador se asegura de que exista la cuenta laura.est@soyudemedellin.edu.co",
              "outcome": "SUCCESS",
              "duration": 19,
              "children": [],
              "type": "Interaction",
              "startedAt": "2026-10-27T05:25:31.381Z",
              "location": {
                "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/sebas/actors.ts",
                "line": 37,
                "column": 22
              },
              "artifacts": [
                {
                  "path": "test-runs/2026-10-27T05-25-28.819Z/screenshot-win32-chromium-156-0-4314-42-preparador-se-asegura-de-que-exista-40ad070d69.png",
                  "type": "screenshot"
                }
              ]
            },
            {
              "name": "Preparador se asegura de que exista la cuenta tomas.coach@udem.edu.co",
              "outcome": "SUCCESS",
              "duration": 19,
              "children": [],
              "type": "Interaction",
              "startedAt": "2026-10-27T05:25:31.602Z",
              "location": {
                "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/sebas/actors.ts",
                "line": 38,
                "column": 22
              },
              "artifacts": [
                {
                  "path": "test-runs/2026-10-27T05-25-28.819Z/screenshot-win32-chromium-156-0-4314-42-preparador-se-asegura-de-que-exista-40ad070d69.png",
                  "type": "screenshot"
                }
              ]
            },
            {
              "name": "Preparador deja a laura.est@soyudemedellin.edu.co sin reservas activas",
              "outcome": "SUCCESS",
              "duration": 14,
              "children": [],
              "type": "Interaction",
              "startedAt": "2026-10-27T05:25:31.681Z",
              "location": {
                "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/sebas/actors.ts",
                "line": 39,
                "column": 30
              },
              "artifacts": [
                {
                  "path": "test-runs/2026-10-27T05-25-28.819Z/screenshot-win32-chromium-156-0-4314-42-preparador-deja-a-laura-est-soyudem-40ad070d69.png",
                  "type": "screenshot"
                }
              ]
            }
          ],
          "type": "Task",
          "startedAt": "2026-10-27T05:25:31.378Z",
          "location": {
            "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/sebas/actors.ts",
            "line": 27
          }
        },
        {
          "name": "Dado que Laura tiene una reserva para mañana en el bloque 1",
          "outcome": "SUCCESS",
          "duration": 90,
          "children": [
            {
              "name": "Preparador reserva por la API el bloque 1 para laura.est@soyudemedellin.edu.co",
              "outcome": "SUCCESS",
              "duration": 45,
              "children": [],
              "type": "Interaction",
              "startedAt": "2026-10-27T05:25:31.746Z",
              "location": {
                "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/step-definitions/sebas-e2e.steps.ts",
                "line": 19,
                "column": 63
              },
              "artifacts": [
                {
                  "path": "test-runs/2026-10-27T05-25-28.819Z/screenshot-win32-chromium-156-0-4314-42-preparador-reserva-por-la-api-el-bl-40ad070d69.png",
                  "type": "screenshot"
                }
              ]
            }
          ],
          "type": "Task",
          "startedAt": "2026-10-27T05:25:31.744Z",
          "location": {
            "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/sebas-e2e.feature",
            "line": 21
          }
        },
        {
          "name": "Y que Laura entró como estudiante",
          "outcome": "SUCCESS",
          "duration": 1215,
          "children": [
            {
              "name": "Laura inicia sesión como laura.est@soyudemedellin.edu.co",
              "outcome": "SUCCESS",
              "duration": 1004,
              "children": [
                {
                  "name": "Laura navigates to \"http://localhost:5173\"",
                  "outcome": "SUCCESS",
                  "duration": 394,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-27T05:25:31.840Z",
                  "location": {
                    "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/step-definitions/sebas-e2e.steps.ts",
                    "line": 23,
                    "column": 54
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-27T05-25-28.819Z/screenshot-win32-chromium-156-0-4314-42-laura-navigates-to--http---localhos-afa80f90fc.png",
                      "type": "screenshot"
                    }
                  ]
                },
                {
                  "name": "Laura enters \"laura.est@soyudemedellin.edu.co\" into campo correo",
                  "outcome": "SUCCESS",
                  "duration": 21,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-27T05:25:32.348Z",
                  "location": {
                    "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/camila/tasks.ts",
                    "line": 15,
                    "column": 36
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-27T05-25-28.819Z/screenshot-win32-chromium-156-0-4314-42-laura-enters--laura-est-soyudemedel-26b03aa512.png",
                      "type": "screenshot"
                    }
                  ]
                },
                {
                  "name": "Laura enters \"1000000003\" into campo documento (contraseña)",
                  "outcome": "SUCCESS",
                  "duration": 9,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-27T05:25:32.451Z",
                  "location": {
                    "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/camila/tasks.ts",
                    "line": 16,
                    "column": 40
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-27T05-25-28.819Z/screenshot-win32-chromium-156-0-4314-42-laura-enters--1000000003--into-camp-b119774859.png",
                      "type": "screenshot"
                    }
                  ]
                },
                {
                  "name": "Laura clicks on botón ingresar",
                  "outcome": "SUCCESS",
                  "duration": 210,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-27T05:25:32.545Z",
                  "location": {
                    "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/camila/tasks.ts",
                    "line": 17,
                    "column": 13
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-27T05-25-28.819Z/screenshot-win32-chromium-156-0-4314-42-laura-clicks-on-bot-n-ingresar-ed44db3551.png",
                      "type": "screenshot"
                    }
                  ]
                }
              ],
              "type": "Task",
              "startedAt": "2026-10-27T05:25:31.840Z",
              "location": {
                "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/step-definitions/sebas-e2e.steps.ts",
                "line": 23,
                "column": 54
              }
            },
            {
              "name": "Laura waits until lista de bloques horarios does become visible",
              "outcome": "SUCCESS",
              "duration": 123,
              "children": [],
              "type": "Interaction",
              "startedAt": "2026-10-27T05:25:32.860Z",
              "location": {
                "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/step-definitions/sebas-e2e.steps.ts",
                "line": 23,
                "column": 78
              },
              "artifacts": [
                {
                  "path": "test-runs/2026-10-27T05-25-28.819Z/screenshot-win32-chromium-156-0-4314-42-laura-waits-until-lista-de-bloques--cddb1fc920.png",
                  "type": "screenshot"
                }
              ]
            }
          ],
          "type": "Task",
          "startedAt": "2026-10-27T05:25:31.834Z",
          "location": {
            "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/sebas-e2e.feature",
            "line": 22
          }
        },
        {
          "name": "Cuando abre sus reservas",
          "outcome": "SUCCESS",
          "duration": 237,
          "children": [
            {
              "name": "Laura abre Mis reservas",
              "outcome": "SUCCESS",
              "duration": 217,
              "children": [
                {
                  "name": "Laura waits until botón Mis reservas does become visible",
                  "outcome": "SUCCESS",
                  "duration": 24,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-27T05:25:33.052Z",
                  "location": {
                    "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/sebas/tasks.ts",
                    "line": 22,
                    "column": 42
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-27T05-25-28.819Z/screenshot-win32-chromium-156-0-4314-42-laura-waits-until-bot-n-mis-reserva-166162349d.png",
                      "type": "screenshot"
                    }
                  ]
                },
                {
                  "name": "Laura clicks on botón Mis reservas",
                  "outcome": "SUCCESS",
                  "duration": 56,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-27T05:25:33.144Z",
                  "location": {
                    "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/sebas/tasks.ts",
                    "line": 22,
                    "column": 77
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-27T05-25-28.819Z/screenshot-win32-chromium-156-0-4314-42-laura-clicks-on-bot-n-mis-reservas-0f670b0d5a.png",
                      "type": "screenshot"
                    }
                  ]
                }
              ],
              "type": "Task",
              "startedAt": "2026-10-27T05:25:33.052Z",
              "location": {
                "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/step-definitions/sebas-e2e.steps.ts",
                "line": 51,
                "column": 58
              }
            }
          ],
          "type": "Task",
          "startedAt": "2026-10-27T05:25:33.049Z",
          "location": {
            "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/sebas-e2e.feature",
            "line": 23
          }
        },
        {
          "name": "Entonces debe ver su reserva de las \"06:00\" en estado \"Activa\"",
          "outcome": "SUCCESS",
          "duration": 173,
          "children": [
            {
              "name": "Laura ensures that the text of hora de la reserva does eventually equal \"06:00\"",
              "outcome": "SUCCESS",
              "duration": 29,
              "children": [],
              "type": "Interaction",
              "startedAt": "2026-10-27T05:25:33.291Z",
              "location": {
                "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/step-definitions/sebas-e2e.steps.ts",
                "line": 56,
                "column": 12
              },
              "artifacts": [
                {
                  "path": "test-runs/2026-10-27T05-25-28.819Z/screenshot-win32-chromium-156-0-4314-42-laura-ensures-that-the-text-of-hora-a46821b65b.png",
                  "type": "screenshot"
                }
              ]
            },
            {
              "name": "Laura ensures that the text of estado de la reserva does eventually include \"Activa\"",
              "outcome": "SUCCESS",
              "duration": 19,
              "children": [],
              "type": "Interaction",
              "startedAt": "2026-10-27T05:25:33.380Z",
              "location": {
                "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/step-definitions/sebas-e2e.steps.ts",
                "line": 57,
                "column": 12
              },
              "artifacts": [
                {
                  "path": "test-runs/2026-10-27T05-25-28.819Z/screenshot-win32-chromium-156-0-4314-42-laura-ensures-that-the-text-of-esta-05c40f2a1d.png",
                  "type": "screenshot"
                }
              ]
            }
          ],
          "type": "Task",
          "startedAt": "2026-10-27T05:25:33.286Z",
          "location": {
            "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/sebas-e2e.feature",
            "line": 24
          }
        },
        {
          "name": "Cuando cancela la reserva y confirma",
          "outcome": "SUCCESS",
          "duration": 621,
          "children": [
            {
              "name": "Laura cancela su reserva y confirma",
              "outcome": "SUCCESS",
              "duration": 595,
              "children": [
                {
                  "name": "Laura waits until botón Cancelar reserva does become visible",
                  "outcome": "SUCCESS",
                  "duration": 37,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-27T05:25:33.466Z",
                  "location": {
                    "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/sebas/tasks.ts",
                    "line": 28,
                    "column": 5
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-27T05-25-28.819Z/screenshot-win32-chromium-156-0-4314-42-laura-waits-until-bot-n-cancelar-re-a1c7fa33e3.png",
                      "type": "screenshot"
                    }
                  ]
                },
                {
                  "name": "Laura clicks on botón Cancelar reserva",
                  "outcome": "SUCCESS",
                  "duration": 88,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-27T05:25:33.566Z",
                  "location": {
                    "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/sebas/tasks.ts",
                    "line": 29,
                    "column": 11
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-27T05-25-28.819Z/screenshot-win32-chromium-156-0-4314-42-laura-clicks-on-bot-n-cancelar-rese-d8d8e2d84e.png",
                      "type": "screenshot"
                    }
                  ]
                },
                {
                  "name": "Laura waits until botón Sí, cancelar does become visible",
                  "outcome": "SUCCESS",
                  "duration": 28,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-27T05:25:33.723Z",
                  "location": {
                    "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/sebas/tasks.ts",
                    "line": 30,
                    "column": 5
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-27T05-25-28.819Z/screenshot-win32-chromium-156-0-4314-42-laura-waits-until-bot-n-s---cancela-33868da8d4.png",
                      "type": "screenshot"
                    }
                  ]
                },
                {
                  "name": "Laura clicks on botón Sí, cancelar",
                  "outcome": "SUCCESS",
                  "duration": 198,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-27T05:25:33.815Z",
                  "location": {
                    "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/sebas/tasks.ts",
                    "line": 31,
                    "column": 11
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-27T05-25-28.819Z/screenshot-win32-chromium-156-0-4314-42-laura-clicks-on-bot-n-s---cancelar-f5798092f6.png",
                      "type": "screenshot"
                    }
                  ]
                }
              ],
              "type": "Task",
              "startedAt": "2026-10-27T05:25:33.465Z",
              "location": {
                "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/step-definitions/sebas-e2e.steps.ts",
                "line": 62,
                "column": 59
              }
            }
          ],
          "type": "Task",
          "startedAt": "2026-10-27T05:25:33.459Z",
          "location": {
            "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/sebas-e2e.feature",
            "line": 25
          }
        },
        {
          "name": "Entonces debe ver el aviso de reservas vacías \"Sin reservas activas\"",
          "outcome": "SUCCESS",
          "duration": 110,
          "children": [
            {
              "name": "Laura ensures that the text of título sin reservas activas does eventually equal \"Sin reservas activas\"",
              "outcome": "SUCCESS",
              "duration": 47,
              "children": [],
              "type": "Interaction",
              "startedAt": "2026-10-27T05:25:34.083Z",
              "location": {
                "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/step-definitions/sebas-e2e.steps.ts",
                "line": 66,
                "column": 49
              },
              "artifacts": [
                {
                  "path": "test-runs/2026-10-27T05-25-28.819Z/screenshot-win32-chromium-156-0-4314-42-laura-ensures-that-the-text-of-t-tu-b87d0510ce.png",
                  "type": "screenshot"
                }
              ]
            }
          ],
          "type": "Task",
          "startedAt": "2026-10-27T05:25:34.081Z",
          "location": {
            "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/sebas-e2e.feature",
            "line": 26
          }
        },
        {
          "name": "Y la reserva de mañana de Laura debe quedar \"CANCELADA\" en la base de datos",
          "outcome": "SUCCESS",
          "duration": 77,
          "children": [
            {
              "name": "Laura ensures that el estado de la reserva de mañana de laura.est@soyudemedellin.edu.co does eventually equal \"CANCELADA\"",
              "outcome": "SUCCESS",
              "duration": 21,
              "children": [],
              "type": "Interaction",
              "startedAt": "2026-10-27T05:25:34.194Z",
              "location": {
                "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/step-definitions/sebas-e2e.steps.ts",
                "line": 45,
                "column": 12
              },
              "artifacts": [
                {
                  "path": "test-runs/2026-10-27T05-25-28.819Z/screenshot-win32-chromium-156-0-4314-42-laura-ensures-that-el-estado-de-la--16589b6c8a.png",
                  "type": "screenshot"
                }
              ]
            }
          ],
          "type": "Task",
          "startedAt": "2026-10-27T05:25:34.191Z",
          "location": {
            "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/sebas-e2e.feature",
            "line": 27
          }
        },
        {
          "name": "After",
          "outcome": "SUCCESS",
          "duration": 2,
          "children": [],
          "type": "Task",
          "startedAt": "2026-10-27T05:25:34.268Z",
          "location": {
            "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/sebas/actors.ts",
            "line": 43
          }
        }
      ],
      "executionHistory": [
        {
          "outcome": "SUCCESS",
          "run": "2026-10-27T05-21-21.384Z",
          "timestamp": "2026-10-27T05:21:21.207Z",
          "duration": 2759,
          "activities": [
            {
              "name": "Before",
              "outcome": "SUCCESS",
              "duration": 325,
              "children": [
                {
                  "name": "Preparador se asegura de que exista la cuenta laura.est@soyudemedellin.edu.co",
                  "outcome": "SUCCESS",
                  "duration": 12,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-27T05:21:31.550Z",
                  "location": {
                    "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/sebas/actors.ts",
                    "line": 37,
                    "column": 22
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-27T05-21-21.384Z/screenshot-win32-chromium-156-0-4314-42-preparador-se-asegura-de-que-exista-40ad070d69.png",
                      "type": "screenshot"
                    }
                  ]
                },
                {
                  "name": "Preparador se asegura de que exista la cuenta tomas.coach@udem.edu.co",
                  "outcome": "SUCCESS",
                  "duration": 18,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-27T05:21:31.732Z",
                  "location": {
                    "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/sebas/actors.ts",
                    "line": 38,
                    "column": 22
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-27T05-21-21.384Z/screenshot-win32-chromium-156-0-4314-42-preparador-se-asegura-de-que-exista-40ad070d69.png",
                      "type": "screenshot"
                    }
                  ]
                },
                {
                  "name": "Preparador deja a laura.est@soyudemedellin.edu.co sin reservas activas",
                  "outcome": "SUCCESS",
                  "duration": 10,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-27T05:21:31.810Z",
                  "location": {
                    "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/sebas/actors.ts",
                    "line": 39,
                    "column": 30
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-27T05-21-21.384Z/screenshot-win32-chromium-156-0-4314-42-preparador-deja-a-laura-est-soyudem-40ad070d69.png",
                      "type": "screenshot"
                    }
                  ]
                }
              ],
              "type": "Task",
              "startedAt": "2026-10-27T05:21:31.548Z",
              "location": {
                "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/sebas/actors.ts",
                "line": 27
              }
            },
            {
              "name": "Dado que Laura tiene una reserva para mañana en el bloque 1",
              "outcome": "SUCCESS",
              "duration": 111,
              "children": [
                {
                  "name": "Preparador reserva por la API el bloque 1 para laura.est@soyudemedellin.edu.co",
                  "outcome": "SUCCESS",
                  "duration": 45,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-27T05:21:31.874Z",
                  "location": {
                    "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/step-definitions/sebas-e2e.steps.ts",
                    "line": 19,
                    "column": 63
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-27T05-21-21.384Z/screenshot-win32-chromium-156-0-4314-42-preparador-reserva-por-la-api-el-bl-40ad070d69.png",
                      "type": "screenshot"
                    }
                  ]
                }
              ],
              "type": "Task",
              "startedAt": "2026-10-27T05:21:31.873Z",
              "location": {
                "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/sebas-e2e.feature",
                "line": 21
              }
            },
            {
              "name": "Y que Laura entró como estudiante",
              "outcome": "SUCCESS",
              "duration": 1016,
              "children": [
                {
                  "name": "Laura inicia sesión como laura.est@soyudemedellin.edu.co",
                  "outcome": "SUCCESS",
                  "duration": 808,
                  "children": [
                    {
                      "name": "Laura navigates to \"http://localhost:5173\"",
                      "outcome": "SUCCESS",
                      "duration": 222,
                      "children": [],
                      "type": "Interaction",
                      "startedAt": "2026-10-27T05:21:31.991Z",
                      "location": {
                        "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/step-definitions/sebas-e2e.steps.ts",
                        "line": 23,
                        "column": 54
                      },
                      "artifacts": [
                        {
                          "path": "test-runs/2026-10-27T05-21-21.384Z/screenshot-win32-chromium-156-0-4314-42-laura-navigates-to--http---localhos-afa80f90fc.png",
                          "type": "screenshot"
                        }
                      ]
                    },
                    {
                      "name": "Laura enters \"laura.est@soyudemedellin.edu.co\" into campo correo",
                      "outcome": "SUCCESS",
                      "duration": 21,
                      "children": [],
                      "type": "Interaction",
                      "startedAt": "2026-10-27T05:21:32.328Z",
                      "location": {
                        "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/camila/tasks.ts",
                        "line": 15,
                        "column": 36
                      },
                      "artifacts": [
                        {
                          "path": "test-runs/2026-10-27T05-21-21.384Z/screenshot-win32-chromium-156-0-4314-42-laura-enters--laura-est-soyudemedel-0db7b06ee4.png",
                          "type": "screenshot"
                        }
                      ]
                    },
                    {
                      "name": "Laura enters \"1000000003\" into campo documento (contraseña)",
                      "outcome": "SUCCESS",
                      "duration": 9,
                      "children": [],
                      "type": "Interaction",
                      "startedAt": "2026-10-27T05:21:32.418Z",
                      "location": {
                        "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/camila/tasks.ts",
                        "line": 16,
                        "column": 40
                      },
                      "artifacts": [
                        {
                          "path": "test-runs/2026-10-27T05-21-21.384Z/screenshot-win32-chromium-156-0-4314-42-laura-enters--1000000003--into-camp-a58eb64c0f.png",
                          "type": "screenshot"
                        }
                      ]
                    },
                    {
                      "name": "Laura clicks on botón ingresar",
                      "outcome": "SUCCESS",
                      "duration": 211,
                      "children": [],
                      "type": "Interaction",
                      "startedAt": "2026-10-27T05:21:32.502Z",
                      "location": {
                        "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/camila/tasks.ts",
                        "line": 17,
                        "column": 13
                      },
                      "artifacts": [
                        {
                          "path": "test-runs/2026-10-27T05-21-21.384Z/screenshot-win32-chromium-156-0-4314-42-laura-clicks-on-bot-n-ingresar-6e75a61f66.png",
                          "type": "screenshot"
                        }
                      ]
                    }
                  ],
                  "type": "Task",
                  "startedAt": "2026-10-27T05:21:31.991Z",
                  "location": {
                    "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/step-definitions/sebas-e2e.steps.ts",
                    "line": 23,
                    "column": 54
                  }
                },
                {
                  "name": "Laura waits until lista de bloques horarios does become visible",
                  "outcome": "SUCCESS",
                  "duration": 128,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-27T05:21:32.815Z",
                  "location": {
                    "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/step-definitions/sebas-e2e.steps.ts",
                    "line": 23,
                    "column": 78
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-27T05-21-21.384Z/screenshot-win32-chromium-156-0-4314-42-laura-waits-until-lista-de-bloques--806d7aa0e7.png",
                      "type": "screenshot"
                    }
                  ]
                }
              ],
              "type": "Task",
              "startedAt": "2026-10-27T05:21:31.985Z",
              "location": {
                "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/sebas-e2e.feature",
                "line": 22
              }
            },
            {
              "name": "Cuando abre sus reservas",
              "outcome": "SUCCESS",
              "duration": 234,
              "children": [
                {
                  "name": "Laura abre Mis reservas",
                  "outcome": "SUCCESS",
                  "duration": 209,
                  "children": [
                    {
                      "name": "Laura waits until botón Mis reservas does become visible",
                      "outcome": "SUCCESS",
                      "duration": 23,
                      "children": [],
                      "type": "Interaction",
                      "startedAt": "2026-10-27T05:21:33.005Z",
                      "location": {
                        "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/sebas/tasks.ts",
                        "line": 22,
                        "column": 42
                      },
                      "artifacts": [
                        {
                          "path": "test-runs/2026-10-27T05-21-21.384Z/screenshot-win32-chromium-156-0-4314-42-laura-waits-until-bot-n-mis-reserva-642a0eefe7.png",
                          "type": "screenshot"
                        }
                      ]
                    },
                    {
                      "name": "Laura clicks on botón Mis reservas",
                      "outcome": "SUCCESS",
                      "duration": 58,
                      "children": [],
                      "type": "Interaction",
                      "startedAt": "2026-10-27T05:21:33.096Z",
                      "location": {
                        "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/sebas/tasks.ts",
                        "line": 22,
                        "column": 77
                      },
                      "artifacts": [
                        {
                          "path": "test-runs/2026-10-27T05-21-21.384Z/screenshot-win32-chromium-156-0-4314-42-laura-clicks-on-bot-n-mis-reservas-1e224e3423.png",
                          "type": "screenshot"
                        }
                      ]
                    }
                  ],
                  "type": "Task",
                  "startedAt": "2026-10-27T05:21:33.005Z",
                  "location": {
                    "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/step-definitions/sebas-e2e.steps.ts",
                    "line": 51,
                    "column": 58
                  }
                }
              ],
              "type": "Task",
              "startedAt": "2026-10-27T05:21:33.002Z",
              "location": {
                "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/sebas-e2e.feature",
                "line": 23
              }
            },
            {
              "name": "Entonces debe ver su reserva de las \"06:00\" en estado \"Activa\"",
              "outcome": "SUCCESS",
              "duration": 172,
              "children": [
                {
                  "name": "Laura ensures that the text of hora de la reserva does eventually equal \"06:00\"",
                  "outcome": "SUCCESS",
                  "duration": 28,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-27T05:21:33.241Z",
                  "location": {
                    "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/step-definitions/sebas-e2e.steps.ts",
                    "line": 56,
                    "column": 12
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-27T05-21-21.384Z/screenshot-win32-chromium-156-0-4314-42-laura-ensures-that-the-text-of-hora-06b4494848.png",
                      "type": "screenshot"
                    }
                  ]
                },
                {
                  "name": "Laura ensures that the text of estado de la reserva does eventually include \"Activa\"",
                  "outcome": "SUCCESS",
                  "duration": 19,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-27T05:21:33.330Z",
                  "location": {
                    "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/step-definitions/sebas-e2e.steps.ts",
                    "line": 57,
                    "column": 12
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-27T05-21-21.384Z/screenshot-win32-chromium-156-0-4314-42-laura-ensures-that-the-text-of-esta-1ab5bde013.png",
                      "type": "screenshot"
                    }
                  ]
                }
              ],
              "type": "Task",
              "startedAt": "2026-10-27T05:21:33.236Z",
              "location": {
                "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/sebas-e2e.feature",
                "line": 24
              }
            },
            {
              "name": "Cuando cancela la reserva y confirma",
              "outcome": "SUCCESS",
              "duration": 631,
              "children": [
                {
                  "name": "Laura cancela su reserva y confirma",
                  "outcome": "SUCCESS",
                  "duration": 605,
                  "children": [
                    {
                      "name": "Laura waits until botón Cancelar reserva does become visible",
                      "outcome": "SUCCESS",
                      "duration": 46,
                      "children": [],
                      "type": "Interaction",
                      "startedAt": "2026-10-27T05:21:33.413Z",
                      "location": {
                        "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/sebas/tasks.ts",
                        "line": 28,
                        "column": 5
                      },
                      "artifacts": [
                        {
                          "path": "test-runs/2026-10-27T05-21-21.384Z/screenshot-win32-chromium-156-0-4314-42-laura-waits-until-bot-n-cancelar-re-eb043d3734.png",
                          "type": "screenshot"
                        }
                      ]
                    },
                    {
                      "name": "Laura clicks on botón Cancelar reserva",
                      "outcome": "SUCCESS",
                      "duration": 88,
                      "children": [],
                      "type": "Interaction",
                      "startedAt": "2026-10-27T05:21:33.520Z",
                      "location": {
                        "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/sebas/tasks.ts",
                        "line": 29,
                        "column": 11
                      },
                      "artifacts": [
                        {
                          "path": "test-runs/2026-10-27T05-21-21.384Z/screenshot-win32-chromium-156-0-4314-42-laura-clicks-on-bot-n-cancelar-rese-4bbf5939e6.png",
                          "type": "screenshot"
                        }
                      ]
                    },
                    {
                      "name": "Laura waits until botón Sí, cancelar does become visible",
                      "outcome": "SUCCESS",
                      "duration": 27,
                      "children": [],
                      "type": "Interaction",
                      "startedAt": "2026-10-27T05:21:33.677Z",
                      "location": {
                        "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/sebas/tasks.ts",
                        "line": 30,
                        "column": 5
                      },
                      "artifacts": [
                        {
                          "path": "test-runs/2026-10-27T05-21-21.384Z/screenshot-win32-chromium-156-0-4314-42-laura-waits-until-bot-n-s---cancela-a2db7d641b.png",
                          "type": "screenshot"
                        }
                      ]
                    },
                    {
                      "name": "Laura clicks on botón Sí, cancelar",
                      "outcome": "SUCCESS",
                      "duration": 197,
                      "children": [],
                      "type": "Interaction",
                      "startedAt": "2026-10-27T05:21:33.772Z",
                      "location": {
                        "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/sebas/tasks.ts",
                        "line": 31,
                        "column": 11
                      },
                      "artifacts": [
                        {
                          "path": "test-runs/2026-10-27T05-21-21.384Z/screenshot-win32-chromium-156-0-4314-42-laura-clicks-on-bot-n-s---cancelar-f5798092f6.png",
                          "type": "screenshot"
                        }
                      ]
                    }
                  ],
                  "type": "Task",
                  "startedAt": "2026-10-27T05:21:33.413Z",
                  "location": {
                    "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/step-definitions/sebas-e2e.steps.ts",
                    "line": 62,
                    "column": 59
                  }
                }
              ],
              "type": "Task",
              "startedAt": "2026-10-27T05:21:33.408Z",
              "location": {
                "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/sebas-e2e.feature",
                "line": 25
              }
            },
            {
              "name": "Entonces debe ver el aviso de reservas vacías \"Sin reservas activas\"",
              "outcome": "SUCCESS",
              "duration": 109,
              "children": [
                {
                  "name": "Laura ensures that the text of título sin reservas activas does eventually equal \"Sin reservas activas\"",
                  "outcome": "SUCCESS",
                  "duration": 45,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-27T05:21:34.042Z",
                  "location": {
                    "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/step-definitions/sebas-e2e.steps.ts",
                    "line": 66,
                    "column": 49
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-27T05-21-21.384Z/screenshot-win32-chromium-156-0-4314-42-laura-ensures-that-the-text-of-t-tu-b87d0510ce.png",
                      "type": "screenshot"
                    }
                  ]
                }
              ],
              "type": "Task",
              "startedAt": "2026-10-27T05:21:34.039Z",
              "location": {
                "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/sebas-e2e.feature",
                "line": 26
              }
            },
            {
              "name": "Y la reserva de mañana de Laura debe quedar \"CANCELADA\" en la base de datos",
              "outcome": "SUCCESS",
              "duration": 78,
              "children": [
                {
                  "name": "Laura ensures that el estado de la reserva de mañana de laura.est@soyudemedellin.edu.co does eventually equal \"CANCELADA\"",
                  "outcome": "SUCCESS",
                  "duration": 24,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-27T05:21:34.151Z",
                  "location": {
                    "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/step-definitions/sebas-e2e.steps.ts",
                    "line": 45,
                    "column": 12
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-27T05-21-21.384Z/screenshot-win32-chromium-156-0-4314-42-laura-ensures-that-el-estado-de-la--d7b8f63945.png",
                      "type": "screenshot"
                    }
                  ]
                }
              ],
              "type": "Task",
              "startedAt": "2026-10-27T05:21:34.149Z",
              "location": {
                "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/sebas-e2e.feature",
                "line": 27
              }
            },
            {
              "name": "After",
              "outcome": "SUCCESS",
              "duration": 2,
              "children": [],
              "type": "Task",
              "startedAt": "2026-10-27T05:21:34.227Z",
              "location": {
                "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/sebas/actors.ts",
                "line": 43
              }
            }
          ]
        },
        {
          "outcome": "SUCCESS",
          "run": "2026-10-27T05-25-28.819Z",
          "timestamp": "2026-10-27T05:25:28.133Z",
          "duration": 2986,
          "activities": [
            {
              "name": "Before",
              "outcome": "SUCCESS",
              "duration": 366,
              "children": [
                {
                  "name": "Preparador se asegura de que exista la cuenta laura.est@soyudemedellin.edu.co",
                  "outcome": "SUCCESS",
                  "duration": 19,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-27T05:25:31.381Z",
                  "location": {
                    "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/sebas/actors.ts",
                    "line": 37,
                    "column": 22
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-27T05-25-28.819Z/screenshot-win32-chromium-156-0-4314-42-preparador-se-asegura-de-que-exista-40ad070d69.png",
                      "type": "screenshot"
                    }
                  ]
                },
                {
                  "name": "Preparador se asegura de que exista la cuenta tomas.coach@udem.edu.co",
                  "outcome": "SUCCESS",
                  "duration": 19,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-27T05:25:31.602Z",
                  "location": {
                    "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/sebas/actors.ts",
                    "line": 38,
                    "column": 22
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-27T05-25-28.819Z/screenshot-win32-chromium-156-0-4314-42-preparador-se-asegura-de-que-exista-40ad070d69.png",
                      "type": "screenshot"
                    }
                  ]
                },
                {
                  "name": "Preparador deja a laura.est@soyudemedellin.edu.co sin reservas activas",
                  "outcome": "SUCCESS",
                  "duration": 14,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-27T05:25:31.681Z",
                  "location": {
                    "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/sebas/actors.ts",
                    "line": 39,
                    "column": 30
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-27T05-25-28.819Z/screenshot-win32-chromium-156-0-4314-42-preparador-deja-a-laura-est-soyudem-40ad070d69.png",
                      "type": "screenshot"
                    }
                  ]
                }
              ],
              "type": "Task",
              "startedAt": "2026-10-27T05:25:31.378Z",
              "location": {
                "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/sebas/actors.ts",
                "line": 27
              }
            },
            {
              "name": "Dado que Laura tiene una reserva para mañana en el bloque 1",
              "outcome": "SUCCESS",
              "duration": 90,
              "children": [
                {
                  "name": "Preparador reserva por la API el bloque 1 para laura.est@soyudemedellin.edu.co",
                  "outcome": "SUCCESS",
                  "duration": 45,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-27T05:25:31.746Z",
                  "location": {
                    "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/step-definitions/sebas-e2e.steps.ts",
                    "line": 19,
                    "column": 63
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-27T05-25-28.819Z/screenshot-win32-chromium-156-0-4314-42-preparador-reserva-por-la-api-el-bl-40ad070d69.png",
                      "type": "screenshot"
                    }
                  ]
                }
              ],
              "type": "Task",
              "startedAt": "2026-10-27T05:25:31.744Z",
              "location": {
                "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/sebas-e2e.feature",
                "line": 21
              }
            },
            {
              "name": "Y que Laura entró como estudiante",
              "outcome": "SUCCESS",
              "duration": 1215,
              "children": [
                {
                  "name": "Laura inicia sesión como laura.est@soyudemedellin.edu.co",
                  "outcome": "SUCCESS",
                  "duration": 1004,
                  "children": [
                    {
                      "name": "Laura navigates to \"http://localhost:5173\"",
                      "outcome": "SUCCESS",
                      "duration": 394,
                      "children": [],
                      "type": "Interaction",
                      "startedAt": "2026-10-27T05:25:31.840Z",
                      "location": {
                        "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/step-definitions/sebas-e2e.steps.ts",
                        "line": 23,
                        "column": 54
                      },
                      "artifacts": [
                        {
                          "path": "test-runs/2026-10-27T05-25-28.819Z/screenshot-win32-chromium-156-0-4314-42-laura-navigates-to--http---localhos-afa80f90fc.png",
                          "type": "screenshot"
                        }
                      ]
                    },
                    {
                      "name": "Laura enters \"laura.est@soyudemedellin.edu.co\" into campo correo",
                      "outcome": "SUCCESS",
                      "duration": 21,
                      "children": [],
                      "type": "Interaction",
                      "startedAt": "2026-10-27T05:25:32.348Z",
                      "location": {
                        "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/camila/tasks.ts",
                        "line": 15,
                        "column": 36
                      },
                      "artifacts": [
                        {
                          "path": "test-runs/2026-10-27T05-25-28.819Z/screenshot-win32-chromium-156-0-4314-42-laura-enters--laura-est-soyudemedel-26b03aa512.png",
                          "type": "screenshot"
                        }
                      ]
                    },
                    {
                      "name": "Laura enters \"1000000003\" into campo documento (contraseña)",
                      "outcome": "SUCCESS",
                      "duration": 9,
                      "children": [],
                      "type": "Interaction",
                      "startedAt": "2026-10-27T05:25:32.451Z",
                      "location": {
                        "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/camila/tasks.ts",
                        "line": 16,
                        "column": 40
                      },
                      "artifacts": [
                        {
                          "path": "test-runs/2026-10-27T05-25-28.819Z/screenshot-win32-chromium-156-0-4314-42-laura-enters--1000000003--into-camp-b119774859.png",
                          "type": "screenshot"
                        }
                      ]
                    },
                    {
                      "name": "Laura clicks on botón ingresar",
                      "outcome": "SUCCESS",
                      "duration": 210,
                      "children": [],
                      "type": "Interaction",
                      "startedAt": "2026-10-27T05:25:32.545Z",
                      "location": {
                        "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/camila/tasks.ts",
                        "line": 17,
                        "column": 13
                      },
                      "artifacts": [
                        {
                          "path": "test-runs/2026-10-27T05-25-28.819Z/screenshot-win32-chromium-156-0-4314-42-laura-clicks-on-bot-n-ingresar-ed44db3551.png",
                          "type": "screenshot"
                        }
                      ]
                    }
                  ],
                  "type": "Task",
                  "startedAt": "2026-10-27T05:25:31.840Z",
                  "location": {
                    "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/step-definitions/sebas-e2e.steps.ts",
                    "line": 23,
                    "column": 54
                  }
                },
                {
                  "name": "Laura waits until lista de bloques horarios does become visible",
                  "outcome": "SUCCESS",
                  "duration": 123,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-27T05:25:32.860Z",
                  "location": {
                    "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/step-definitions/sebas-e2e.steps.ts",
                    "line": 23,
                    "column": 78
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-27T05-25-28.819Z/screenshot-win32-chromium-156-0-4314-42-laura-waits-until-lista-de-bloques--cddb1fc920.png",
                      "type": "screenshot"
                    }
                  ]
                }
              ],
              "type": "Task",
              "startedAt": "2026-10-27T05:25:31.834Z",
              "location": {
                "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/sebas-e2e.feature",
                "line": 22
              }
            },
            {
              "name": "Cuando abre sus reservas",
              "outcome": "SUCCESS",
              "duration": 237,
              "children": [
                {
                  "name": "Laura abre Mis reservas",
                  "outcome": "SUCCESS",
                  "duration": 217,
                  "children": [
                    {
                      "name": "Laura waits until botón Mis reservas does become visible",
                      "outcome": "SUCCESS",
                      "duration": 24,
                      "children": [],
                      "type": "Interaction",
                      "startedAt": "2026-10-27T05:25:33.052Z",
                      "location": {
                        "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/sebas/tasks.ts",
                        "line": 22,
                        "column": 42
                      },
                      "artifacts": [
                        {
                          "path": "test-runs/2026-10-27T05-25-28.819Z/screenshot-win32-chromium-156-0-4314-42-laura-waits-until-bot-n-mis-reserva-166162349d.png",
                          "type": "screenshot"
                        }
                      ]
                    },
                    {
                      "name": "Laura clicks on botón Mis reservas",
                      "outcome": "SUCCESS",
                      "duration": 56,
                      "children": [],
                      "type": "Interaction",
                      "startedAt": "2026-10-27T05:25:33.144Z",
                      "location": {
                        "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/sebas/tasks.ts",
                        "line": 22,
                        "column": 77
                      },
                      "artifacts": [
                        {
                          "path": "test-runs/2026-10-27T05-25-28.819Z/screenshot-win32-chromium-156-0-4314-42-laura-clicks-on-bot-n-mis-reservas-0f670b0d5a.png",
                          "type": "screenshot"
                        }
                      ]
                    }
                  ],
                  "type": "Task",
                  "startedAt": "2026-10-27T05:25:33.052Z",
                  "location": {
                    "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/step-definitions/sebas-e2e.steps.ts",
                    "line": 51,
                    "column": 58
                  }
                }
              ],
              "type": "Task",
              "startedAt": "2026-10-27T05:25:33.049Z",
              "location": {
                "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/sebas-e2e.feature",
                "line": 23
              }
            },
            {
              "name": "Entonces debe ver su reserva de las \"06:00\" en estado \"Activa\"",
              "outcome": "SUCCESS",
              "duration": 173,
              "children": [
                {
                  "name": "Laura ensures that the text of hora de la reserva does eventually equal \"06:00\"",
                  "outcome": "SUCCESS",
                  "duration": 29,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-27T05:25:33.291Z",
                  "location": {
                    "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/step-definitions/sebas-e2e.steps.ts",
                    "line": 56,
                    "column": 12
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-27T05-25-28.819Z/screenshot-win32-chromium-156-0-4314-42-laura-ensures-that-the-text-of-hora-a46821b65b.png",
                      "type": "screenshot"
                    }
                  ]
                },
                {
                  "name": "Laura ensures that the text of estado de la reserva does eventually include \"Activa\"",
                  "outcome": "SUCCESS",
                  "duration": 19,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-27T05:25:33.380Z",
                  "location": {
                    "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/step-definitions/sebas-e2e.steps.ts",
                    "line": 57,
                    "column": 12
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-27T05-25-28.819Z/screenshot-win32-chromium-156-0-4314-42-laura-ensures-that-the-text-of-esta-05c40f2a1d.png",
                      "type": "screenshot"
                    }
                  ]
                }
              ],
              "type": "Task",
              "startedAt": "2026-10-27T05:25:33.286Z",
              "location": {
                "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/sebas-e2e.feature",
                "line": 24
              }
            },
            {
              "name": "Cuando cancela la reserva y confirma",
              "outcome": "SUCCESS",
              "duration": 621,
              "children": [
                {
                  "name": "Laura cancela su reserva y confirma",
                  "outcome": "SUCCESS",
                  "duration": 595,
                  "children": [
                    {
                      "name": "Laura waits until botón Cancelar reserva does become visible",
                      "outcome": "SUCCESS",
                      "duration": 37,
                      "children": [],
                      "type": "Interaction",
                      "startedAt": "2026-10-27T05:25:33.466Z",
                      "location": {
                        "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/sebas/tasks.ts",
                        "line": 28,
                        "column": 5
                      },
                      "artifacts": [
                        {
                          "path": "test-runs/2026-10-27T05-25-28.819Z/screenshot-win32-chromium-156-0-4314-42-laura-waits-until-bot-n-cancelar-re-a1c7fa33e3.png",
                          "type": "screenshot"
                        }
                      ]
                    },
                    {
                      "name": "Laura clicks on botón Cancelar reserva",
                      "outcome": "SUCCESS",
                      "duration": 88,
                      "children": [],
                      "type": "Interaction",
                      "startedAt": "2026-10-27T05:25:33.566Z",
                      "location": {
                        "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/sebas/tasks.ts",
                        "line": 29,
                        "column": 11
                      },
                      "artifacts": [
                        {
                          "path": "test-runs/2026-10-27T05-25-28.819Z/screenshot-win32-chromium-156-0-4314-42-laura-clicks-on-bot-n-cancelar-rese-d8d8e2d84e.png",
                          "type": "screenshot"
                        }
                      ]
                    },
                    {
                      "name": "Laura waits until botón Sí, cancelar does become visible",
                      "outcome": "SUCCESS",
                      "duration": 28,
                      "children": [],
                      "type": "Interaction",
                      "startedAt": "2026-10-27T05:25:33.723Z",
                      "location": {
                        "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/sebas/tasks.ts",
                        "line": 30,
                        "column": 5
                      },
                      "artifacts": [
                        {
                          "path": "test-runs/2026-10-27T05-25-28.819Z/screenshot-win32-chromium-156-0-4314-42-laura-waits-until-bot-n-s---cancela-33868da8d4.png",
                          "type": "screenshot"
                        }
                      ]
                    },
                    {
                      "name": "Laura clicks on botón Sí, cancelar",
                      "outcome": "SUCCESS",
                      "duration": 198,
                      "children": [],
                      "type": "Interaction",
                      "startedAt": "2026-10-27T05:25:33.815Z",
                      "location": {
                        "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/sebas/tasks.ts",
                        "line": 31,
                        "column": 11
                      },
                      "artifacts": [
                        {
                          "path": "test-runs/2026-10-27T05-25-28.819Z/screenshot-win32-chromium-156-0-4314-42-laura-clicks-on-bot-n-s---cancelar-f5798092f6.png",
                          "type": "screenshot"
                        }
                      ]
                    }
                  ],
                  "type": "Task",
                  "startedAt": "2026-10-27T05:25:33.465Z",
                  "location": {
                    "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/step-definitions/sebas-e2e.steps.ts",
                    "line": 62,
                    "column": 59
                  }
                }
              ],
              "type": "Task",
              "startedAt": "2026-10-27T05:25:33.459Z",
              "location": {
                "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/sebas-e2e.feature",
                "line": 25
              }
            },
            {
              "name": "Entonces debe ver el aviso de reservas vacías \"Sin reservas activas\"",
              "outcome": "SUCCESS",
              "duration": 110,
              "children": [
                {
                  "name": "Laura ensures that the text of título sin reservas activas does eventually equal \"Sin reservas activas\"",
                  "outcome": "SUCCESS",
                  "duration": 47,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-27T05:25:34.083Z",
                  "location": {
                    "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/step-definitions/sebas-e2e.steps.ts",
                    "line": 66,
                    "column": 49
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-27T05-25-28.819Z/screenshot-win32-chromium-156-0-4314-42-laura-ensures-that-the-text-of-t-tu-b87d0510ce.png",
                      "type": "screenshot"
                    }
                  ]
                }
              ],
              "type": "Task",
              "startedAt": "2026-10-27T05:25:34.081Z",
              "location": {
                "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/sebas-e2e.feature",
                "line": 26
              }
            },
            {
              "name": "Y la reserva de mañana de Laura debe quedar \"CANCELADA\" en la base de datos",
              "outcome": "SUCCESS",
              "duration": 77,
              "children": [
                {
                  "name": "Laura ensures that el estado de la reserva de mañana de laura.est@soyudemedellin.edu.co does eventually equal \"CANCELADA\"",
                  "outcome": "SUCCESS",
                  "duration": 21,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-27T05:25:34.194Z",
                  "location": {
                    "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/step-definitions/sebas-e2e.steps.ts",
                    "line": 45,
                    "column": 12
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-27T05-25-28.819Z/screenshot-win32-chromium-156-0-4314-42-laura-ensures-that-el-estado-de-la--16589b6c8a.png",
                      "type": "screenshot"
                    }
                  ]
                }
              ],
              "type": "Task",
              "startedAt": "2026-10-27T05:25:34.191Z",
              "location": {
                "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/sebas-e2e.feature",
                "line": 27
              }
            },
            {
              "name": "After",
              "outcome": "SUCCESS",
              "duration": 2,
              "children": [],
              "type": "Task",
              "startedAt": "2026-10-27T05:25:34.268Z",
              "location": {
                "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/sebas/actors.ts",
                "line": 43
              }
            }
          ]
        }
      ],
      "narrative": "<p>Como estudiante o entrenador del gimnasio UdeM\nQuiero usar la interfaz web\nPara comprobar de punta a punta RF06, RF07, RF08, RF09 y RF10</p>\n",
      "cast": [
        {
          "name": "Preparador",
          "abilities": [
            {
              "name": "PerformActivities"
            },
            {
              "name": "AnswerQuestions"
            },
            {
              "name": "RaiseErrors"
            },
            {
              "name": "ScheduleWork",
              "details": "{\"scheduler\":{\"clock\":{\"timeAdjustment\":{\"milliseconds\":0}},\"interactionTimeout\":{\"milliseconds\":5000}}}"
            },
            {
              "name": "BrowseTheWebWithPlaywright"
            },
            {
              "name": "ConsultarLaBaseDeDatos"
            }
          ]
        },
        {
          "name": "Laura",
          "abilities": [
            {
              "name": "PerformActivities"
            },
            {
              "name": "AnswerQuestions"
            },
            {
              "name": "RaiseErrors"
            },
            {
              "name": "ScheduleWork",
              "details": "{\"scheduler\":{\"clock\":{\"timeAdjustment\":{\"milliseconds\":0}},\"interactionTimeout\":{\"milliseconds\":5000}}}"
            },
            {
              "name": "BrowseTheWebWithPlaywright"
            },
            {
              "name": "ConsultarLaBaseDeDatos"
            }
          ]
        }
      ],
      "id": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/sebas-e2e.feature:20"
    },
    {
      "name": "El entrenador encuentra la reserva activa de una estudiante (RF10 exitoso)",
      "category": "E2E de navegador - reservas del estudiante y búsqueda del entrenador",
      "outcome": "SUCCESS",
      "duration": 2207,
      "startedAt": "2026-10-27T05:25:34.369Z",
      "source": {
        "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/sebas-e2e.feature",
        "line": 31
      },
      "tags": [
        {
          "type": "feature",
          "name": "E2E de navegador - reservas del estudiante y búsqueda del entrenador"
        },
        {
          "type": "tag",
          "name": "sebas-e2e"
        },
        {
          "type": "tag",
          "name": "rf10"
        }
      ],
      "activities": [
        {
          "name": "Before",
          "outcome": "SUCCESS",
          "duration": 338,
          "children": [
            {
              "name": "Preparador se asegura de que exista la cuenta laura.est@soyudemedellin.edu.co",
              "outcome": "SUCCESS",
              "duration": 10,
              "children": [],
              "type": "Interaction",
              "startedAt": "2026-10-27T05:25:34.371Z",
              "location": {
                "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/sebas/actors.ts",
                "line": 37,
                "column": 22
              },
              "artifacts": [
                {
                  "path": "test-runs/2026-10-27T05-25-28.819Z/screenshot-win32-chromium-156-0-4314-42-preparador-se-asegura-de-que-exista-40ad070d69.png",
                  "type": "screenshot"
                }
              ]
            },
            {
              "name": "Preparador se asegura de que exista la cuenta tomas.coach@udem.edu.co",
              "outcome": "SUCCESS",
              "duration": 19,
              "children": [],
              "type": "Interaction",
              "startedAt": "2026-10-27T05:25:34.582Z",
              "location": {
                "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/sebas/actors.ts",
                "line": 38,
                "column": 22
              },
              "artifacts": [
                {
                  "path": "test-runs/2026-10-27T05-25-28.819Z/screenshot-win32-chromium-156-0-4314-42-preparador-se-asegura-de-que-exista-40ad070d69.png",
                  "type": "screenshot"
                }
              ]
            },
            {
              "name": "Preparador deja a laura.est@soyudemedellin.edu.co sin reservas activas",
              "outcome": "SUCCESS",
              "duration": 10,
              "children": [],
              "type": "Interaction",
              "startedAt": "2026-10-27T05:25:34.640Z",
              "location": {
                "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/sebas/actors.ts",
                "line": 39,
                "column": 30
              },
              "artifacts": [
                {
                  "path": "test-runs/2026-10-27T05-25-28.819Z/screenshot-win32-chromium-156-0-4314-42-preparador-deja-a-laura-est-soyudem-40ad070d69.png",
                  "type": "screenshot"
                }
              ]
            }
          ],
          "type": "Task",
          "startedAt": "2026-10-27T05:25:34.369Z",
          "location": {
            "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/sebas/actors.ts",
            "line": 27
          }
        },
        {
          "name": "Dado que Laura tiene una reserva para mañana en el bloque 1",
          "outcome": "SUCCESS",
          "duration": 109,
          "children": [
            {
              "name": "Preparador reserva por la API el bloque 1 para laura.est@soyudemedellin.edu.co",
              "outcome": "SUCCESS",
              "duration": 53,
              "children": [],
              "type": "Interaction",
              "startedAt": "2026-10-27T05:25:34.709Z",
              "location": {
                "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/step-definitions/sebas-e2e.steps.ts",
                "line": 19,
                "column": 63
              },
              "artifacts": [
                {
                  "path": "test-runs/2026-10-27T05-25-28.819Z/screenshot-win32-chromium-156-0-4314-42-preparador-reserva-por-la-api-el-bl-40ad070d69.png",
                  "type": "screenshot"
                }
              ]
            }
          ],
          "type": "Task",
          "startedAt": "2026-10-27T05:25:34.708Z",
          "location": {
            "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/sebas-e2e.feature",
            "line": 32
          }
        },
        {
          "name": "Y que Tomás entró como entrenador",
          "outcome": "SUCCESS",
          "duration": 1038,
          "children": [
            {
              "name": "Tomás inicia sesión como tomas.coach@udem.edu.co",
              "outcome": "SUCCESS",
              "duration": 876,
              "children": [
                {
                  "name": "Tomás navigates to \"http://localhost:5173\"",
                  "outcome": "SUCCESS",
                  "duration": 228,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-27T05:25:34.824Z",
                  "location": {
                    "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/step-definitions/sebas-e2e.steps.ts",
                    "line": 27,
                    "column": 54
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-27T05-25-28.819Z/screenshot-win32-chromium-156-0-4314-42-tom-s-navigates-to--http---localhos-33b4179048.png",
                      "type": "screenshot"
                    }
                  ]
                },
                {
                  "name": "Tomás enters \"tomas.coach@udem.edu.co\" into campo correo",
                  "outcome": "SUCCESS",
                  "duration": 23,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-27T05:25:35.181Z",
                  "location": {
                    "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/camila/tasks.ts",
                    "line": 15,
                    "column": 36
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-27T05-25-28.819Z/screenshot-win32-chromium-156-0-4314-42-tom-s-enters--tomas-coach-udem-edu--a527d679f7.png",
                      "type": "screenshot"
                    }
                  ]
                },
                {
                  "name": "Tomás enters \"1000000002\" into campo documento (contraseña)",
                  "outcome": "SUCCESS",
                  "duration": 10,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-27T05:25:35.292Z",
                  "location": {
                    "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/camila/tasks.ts",
                    "line": 16,
                    "column": 40
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-27T05-25-28.819Z/screenshot-win32-chromium-156-0-4314-42-tom-s-enters--1000000002--into-camp-05e5b41bee.png",
                      "type": "screenshot"
                    }
                  ]
                },
                {
                  "name": "Tomás clicks on botón ingresar",
                  "outcome": "SUCCESS",
                  "duration": 219,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-27T05:25:35.385Z",
                  "location": {
                    "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/camila/tasks.ts",
                    "line": 17,
                    "column": 13
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-27T05-25-28.819Z/screenshot-win32-chromium-156-0-4314-42-tom-s-clicks-on-bot-n-ingresar-a1391d5f19.png",
                      "type": "screenshot"
                    }
                  ]
                }
              ],
              "type": "Task",
              "startedAt": "2026-10-27T05:25:34.824Z",
              "location": {
                "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/step-definitions/sebas-e2e.steps.ts",
                "line": 27,
                "column": 54
              }
            },
            {
              "name": "Tomás waits until buscador de estudiantes does become visible",
              "outcome": "SUCCESS",
              "duration": 89,
              "children": [],
              "type": "Interaction",
              "startedAt": "2026-10-27T05:25:35.715Z",
              "location": {
                "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/step-definitions/sebas-e2e.steps.ts",
                "line": 27,
                "column": 78
              },
              "artifacts": [
                {
                  "path": "test-runs/2026-10-27T05-25-28.819Z/screenshot-win32-chromium-156-0-4314-42-tom-s-waits-until-buscador-de-estud-85092fdcc1.png",
                  "type": "screenshot"
                }
              ]
            }
          ],
          "type": "Task",
          "startedAt": "2026-10-27T05:25:34.818Z",
          "location": {
            "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/sebas-e2e.feature",
            "line": 33
          }
        },
        {
          "name": "Cuando consulta en el buscador el documento \"1000000003\"",
          "outcome": "SUCCESS",
          "duration": 468,
          "children": [
            {
              "name": "Tomás busca en el panel el documento 1000000003",
              "outcome": "SUCCESS",
              "duration": 446,
              "children": [
                {
                  "name": "Tomás waits until campo documento del estudiante does become visible",
                  "outcome": "SUCCESS",
                  "duration": 41,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-27T05:25:35.862Z",
                  "location": {
                    "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/sebas/tasks.ts",
                    "line": 38,
                    "column": 7
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-27T05-25-28.819Z/screenshot-win32-chromium-156-0-4314-42-tom-s-waits-until-campo-documento-d-00e5ec0480.png",
                      "type": "screenshot"
                    }
                  ]
                },
                {
                  "name": "Tomás enters \"1000000003\" into campo documento del estudiante",
                  "outcome": "SUCCESS",
                  "duration": 7,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-27T05:25:35.965Z",
                  "location": {
                    "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/sebas/tasks.ts",
                    "line": 39,
                    "column": 33
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-27T05-25-28.819Z/screenshot-win32-chromium-156-0-4314-42-tom-s-enters--1000000003--into-camp-d27d80509a.png",
                      "type": "screenshot"
                    }
                  ]
                },
                {
                  "name": "Tomás clicks on botón Buscar",
                  "outcome": "SUCCESS",
                  "duration": 204,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-27T05:25:36.043Z",
                  "location": {
                    "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/sebas/tasks.ts",
                    "line": 40,
                    "column": 13
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-27T05-25-28.819Z/screenshot-win32-chromium-156-0-4314-42-tom-s-clicks-on-bot-n-buscar-f6f0b06462.png",
                      "type": "screenshot"
                    }
                  ]
                }
              ],
              "type": "Task",
              "startedAt": "2026-10-27T05:25:35.862Z",
              "location": {
                "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/step-definitions/sebas-e2e.steps.ts",
                "line": 71,
                "column": 60
              }
            }
          ],
          "type": "Task",
          "startedAt": "2026-10-27T05:25:35.856Z",
          "location": {
            "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/sebas-e2e.feature",
            "line": 34
          }
        },
        {
          "name": "Entonces debe aparecer la estudiante \"Laura Estudiante\" con su reserva de las \"06:00\"",
          "outcome": "SUCCESS",
          "duration": 159,
          "children": [
            {
              "name": "Tomás ensures that the text of nombre del estudiante encontrado does eventually equal \"Laura Estudiante\"",
              "outcome": "SUCCESS",
              "duration": 14,
              "children": [],
              "type": "Interaction",
              "startedAt": "2026-10-27T05:25:36.329Z",
              "location": {
                "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/step-definitions/sebas-e2e.steps.ts",
                "line": 76,
                "column": 12
              },
              "artifacts": [
                {
                  "path": "test-runs/2026-10-27T05-25-28.819Z/screenshot-win32-chromium-156-0-4314-42-tom-s-ensures-that-the-text-of-nomb-856ea34d65.png",
                  "type": "screenshot"
                }
              ]
            },
            {
              "name": "Tomás ensures that the text of bloque de la reserva encontrada does eventually include \"06:00\"",
              "outcome": "SUCCESS",
              "duration": 19,
              "children": [],
              "type": "Interaction",
              "startedAt": "2026-10-27T05:25:36.403Z",
              "location": {
                "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/step-definitions/sebas-e2e.steps.ts",
                "line": 77,
                "column": 12
              },
              "artifacts": [
                {
                  "path": "test-runs/2026-10-27T05-25-28.819Z/screenshot-win32-chromium-156-0-4314-42-tom-s-ensures-that-the-text-of-bloq-c9a645ccb1.png",
                  "type": "screenshot"
                }
              ]
            }
          ],
          "type": "Task",
          "startedAt": "2026-10-27T05:25:36.324Z",
          "location": {
            "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/sebas-e2e.feature",
            "line": 35
          }
        },
        {
          "name": "After",
          "outcome": "SUCCESS",
          "duration": 2,
          "children": [],
          "type": "Task",
          "startedAt": "2026-10-27T05:25:36.483Z",
          "location": {
            "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/sebas/actors.ts",
            "line": 43
          }
        }
      ],
      "executionHistory": [
        {
          "outcome": "SUCCESS",
          "run": "2026-10-27T05-21-21.384Z",
          "timestamp": "2026-10-27T05:21:21.207Z",
          "duration": 2153,
          "activities": [
            {
              "name": "Before",
              "outcome": "SUCCESS",
              "duration": 326,
              "children": [
                {
                  "name": "Preparador se asegura de que exista la cuenta laura.est@soyudemedellin.edu.co",
                  "outcome": "SUCCESS",
                  "duration": 12,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-27T05:21:34.312Z",
                  "location": {
                    "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/sebas/actors.ts",
                    "line": 37,
                    "column": 22
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-27T05-21-21.384Z/screenshot-win32-chromium-156-0-4314-42-preparador-se-asegura-de-que-exista-40ad070d69.png",
                      "type": "screenshot"
                    }
                  ]
                },
                {
                  "name": "Preparador se asegura de que exista la cuenta tomas.coach@udem.edu.co",
                  "outcome": "SUCCESS",
                  "duration": 18,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-27T05:21:34.479Z",
                  "location": {
                    "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/sebas/actors.ts",
                    "line": 38,
                    "column": 22
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-27T05-21-21.384Z/screenshot-win32-chromium-156-0-4314-42-preparador-se-asegura-de-que-exista-40ad070d69.png",
                      "type": "screenshot"
                    }
                  ]
                },
                {
                  "name": "Preparador deja a laura.est@soyudemedellin.edu.co sin reservas activas",
                  "outcome": "SUCCESS",
                  "duration": 9,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-27T05:21:34.573Z",
                  "location": {
                    "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/sebas/actors.ts",
                    "line": 39,
                    "column": 30
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-27T05-21-21.384Z/screenshot-win32-chromium-156-0-4314-42-preparador-deja-a-laura-est-soyudem-40ad070d69.png",
                      "type": "screenshot"
                    }
                  ]
                }
              ],
              "type": "Task",
              "startedAt": "2026-10-27T05:21:34.310Z",
              "location": {
                "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/sebas/actors.ts",
                "line": 27
              }
            },
            {
              "name": "Dado que Laura tiene una reserva para mañana en el bloque 1",
              "outcome": "SUCCESS",
              "duration": 109,
              "children": [
                {
                  "name": "Preparador reserva por la API el bloque 1 para laura.est@soyudemedellin.edu.co",
                  "outcome": "SUCCESS",
                  "duration": 55,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-27T05:21:34.637Z",
                  "location": {
                    "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/step-definitions/sebas-e2e.steps.ts",
                    "line": 19,
                    "column": 63
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-27T05-21-21.384Z/screenshot-win32-chromium-156-0-4314-42-preparador-reserva-por-la-api-el-bl-40ad070d69.png",
                      "type": "screenshot"
                    }
                  ]
                }
              ],
              "type": "Task",
              "startedAt": "2026-10-27T05:21:34.637Z",
              "location": {
                "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/sebas-e2e.feature",
                "line": 32
              }
            },
            {
              "name": "Y que Tomás entró como entrenador",
              "outcome": "SUCCESS",
              "duration": 1003,
              "children": [
                {
                  "name": "Tomás inicia sesión como tomas.coach@udem.edu.co",
                  "outcome": "SUCCESS",
                  "duration": 847,
                  "children": [
                    {
                      "name": "Tomás navigates to \"http://localhost:5173\"",
                      "outcome": "SUCCESS",
                      "duration": 232,
                      "children": [],
                      "type": "Interaction",
                      "startedAt": "2026-10-27T05:21:34.752Z",
                      "location": {
                        "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/step-definitions/sebas-e2e.steps.ts",
                        "line": 27,
                        "column": 54
                      },
                      "artifacts": [
                        {
                          "path": "test-runs/2026-10-27T05-21-21.384Z/screenshot-win32-chromium-156-0-4314-42-tom-s-navigates-to--http---localhos-afa80f90fc.png",
                          "type": "screenshot"
                        }
                      ]
                    },
                    {
                      "name": "Tomás enters \"tomas.coach@udem.edu.co\" into campo correo",
                      "outcome": "SUCCESS",
                      "duration": 21,
                      "children": [],
                      "type": "Interaction",
                      "startedAt": "2026-10-27T05:21:35.105Z",
                      "location": {
                        "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/camila/tasks.ts",
                        "line": 15,
                        "column": 36
                      },
                      "artifacts": [
                        {
                          "path": "test-runs/2026-10-27T05-21-21.384Z/screenshot-win32-chromium-156-0-4314-42-tom-s-enters--tomas-coach-udem-edu--846128c371.png",
                          "type": "screenshot"
                        }
                      ]
                    },
                    {
                      "name": "Tomás enters \"1000000002\" into campo documento (contraseña)",
                      "outcome": "SUCCESS",
                      "duration": 8,
                      "children": [],
                      "type": "Interaction",
                      "startedAt": "2026-10-27T05:21:35.203Z",
                      "location": {
                        "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/camila/tasks.ts",
                        "line": 16,
                        "column": 40
                      },
                      "artifacts": [
                        {
                          "path": "test-runs/2026-10-27T05-21-21.384Z/screenshot-win32-chromium-156-0-4314-42-tom-s-enters--1000000002--into-camp-99732e9a40.png",
                          "type": "screenshot"
                        }
                      ]
                    },
                    {
                      "name": "Tomás clicks on botón ingresar",
                      "outcome": "SUCCESS",
                      "duration": 209,
                      "children": [],
                      "type": "Interaction",
                      "startedAt": "2026-10-27T05:21:35.298Z",
                      "location": {
                        "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/camila/tasks.ts",
                        "line": 17,
                        "column": 13
                      },
                      "artifacts": [
                        {
                          "path": "test-runs/2026-10-27T05-21-21.384Z/screenshot-win32-chromium-156-0-4314-42-tom-s-clicks-on-bot-n-ingresar-bdeb998d38.png",
                          "type": "screenshot"
                        }
                      ]
                    }
                  ],
                  "type": "Task",
                  "startedAt": "2026-10-27T05:21:34.752Z",
                  "location": {
                    "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/step-definitions/sebas-e2e.steps.ts",
                    "line": 27,
                    "column": 54
                  }
                },
                {
                  "name": "Tomás waits until buscador de estudiantes does become visible",
                  "outcome": "SUCCESS",
                  "duration": 93,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-27T05:21:35.613Z",
                  "location": {
                    "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/step-definitions/sebas-e2e.steps.ts",
                    "line": 27,
                    "column": 78
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-27T05-21-21.384Z/screenshot-win32-chromium-156-0-4314-42-tom-s-waits-until-buscador-de-estud-28fa00306a.png",
                      "type": "screenshot"
                    }
                  ]
                }
              ],
              "type": "Task",
              "startedAt": "2026-10-27T05:21:34.747Z",
              "location": {
                "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/sebas-e2e.feature",
                "line": 33
              }
            },
            {
              "name": "Cuando consulta en el buscador el documento \"1000000003\"",
              "outcome": "SUCCESS",
              "duration": 462,
              "children": [
                {
                  "name": "Tomás busca en el panel el documento 1000000003",
                  "outcome": "SUCCESS",
                  "duration": 442,
                  "children": [
                    {
                      "name": "Tomás waits until campo documento del estudiante does become visible",
                      "outcome": "SUCCESS",
                      "duration": 38,
                      "children": [],
                      "type": "Interaction",
                      "startedAt": "2026-10-27T05:21:35.753Z",
                      "location": {
                        "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/sebas/tasks.ts",
                        "line": 39,
                        "column": 7
                      },
                      "artifacts": [
                        {
                          "path": "test-runs/2026-10-27T05-21-21.384Z/screenshot-win32-chromium-156-0-4314-42-tom-s-waits-until-campo-documento-d-1cffa1360a.png",
                          "type": "screenshot"
                        }
                      ]
                    },
                    {
                      "name": "Tomás enters \"1000000003\" into campo documento del estudiante",
                      "outcome": "SUCCESS",
                      "duration": 7,
                      "children": [],
                      "type": "Interaction",
                      "startedAt": "2026-10-27T05:21:35.866Z",
                      "location": {
                        "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/sebas/tasks.ts",
                        "line": 40,
                        "column": 33
                      },
                      "artifacts": [
                        {
                          "path": "test-runs/2026-10-27T05-21-21.384Z/screenshot-win32-chromium-156-0-4314-42-tom-s-enters--1000000003--into-camp-ef4add3cb7.png",
                          "type": "screenshot"
                        }
                      ]
                    },
                    {
                      "name": "Tomás clicks on botón Buscar",
                      "outcome": "SUCCESS",
                      "duration": 191,
                      "children": [],
                      "type": "Interaction",
                      "startedAt": "2026-10-27T05:21:35.945Z",
                      "location": {
                        "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/sebas/tasks.ts",
                        "line": 41,
                        "column": 13
                      },
                      "artifacts": [
                        {
                          "path": "test-runs/2026-10-27T05-21-21.384Z/screenshot-win32-chromium-156-0-4314-42-tom-s-clicks-on-bot-n-buscar-f6f0b06462.png",
                          "type": "screenshot"
                        }
                      ]
                    }
                  ],
                  "type": "Task",
                  "startedAt": "2026-10-27T05:21:35.753Z",
                  "location": {
                    "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/step-definitions/sebas-e2e.steps.ts",
                    "line": 71,
                    "column": 60
                  }
                }
              ],
              "type": "Task",
              "startedAt": "2026-10-27T05:21:35.750Z",
              "location": {
                "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/sebas-e2e.feature",
                "line": 34
              }
            },
            {
              "name": "Entonces debe aparecer la estudiante \"Laura Estudiante\" con su reserva de las \"06:00\"",
              "outcome": "SUCCESS",
              "duration": 157,
              "children": [
                {
                  "name": "Tomás ensures that the text of nombre del estudiante encontrado does eventually equal \"Laura Estudiante\"",
                  "outcome": "SUCCESS",
                  "duration": 13,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-27T05:21:36.217Z",
                  "location": {
                    "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/step-definitions/sebas-e2e.steps.ts",
                    "line": 76,
                    "column": 12
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-27T05-21-21.384Z/screenshot-win32-chromium-156-0-4314-42-tom-s-ensures-that-the-text-of-nomb-60af50571c.png",
                      "type": "screenshot"
                    }
                  ]
                },
                {
                  "name": "Tomás ensures that the text of bloque de la reserva encontrada does eventually include \"06:00\"",
                  "outcome": "SUCCESS",
                  "duration": 18,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-27T05:21:36.290Z",
                  "location": {
                    "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/step-definitions/sebas-e2e.steps.ts",
                    "line": 77,
                    "column": 12
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-27T05-21-21.384Z/screenshot-win32-chromium-156-0-4314-42-tom-s-ensures-that-the-text-of-bloq-f18e45070a.png",
                      "type": "screenshot"
                    }
                  ]
                }
              ],
              "type": "Task",
              "startedAt": "2026-10-27T05:21:36.212Z",
              "location": {
                "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/sebas-e2e.feature",
                "line": 35
              }
            },
            {
              "name": "After",
              "outcome": "SUCCESS",
              "duration": 2,
              "children": [],
              "type": "Task",
              "startedAt": "2026-10-27T05:21:36.369Z",
              "location": {
                "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/sebas/actors.ts",
                "line": 43
              }
            }
          ]
        },
        {
          "outcome": "SUCCESS",
          "run": "2026-10-27T05-25-28.819Z",
          "timestamp": "2026-10-27T05:25:28.133Z",
          "duration": 2207,
          "activities": [
            {
              "name": "Before",
              "outcome": "SUCCESS",
              "duration": 338,
              "children": [
                {
                  "name": "Preparador se asegura de que exista la cuenta laura.est@soyudemedellin.edu.co",
                  "outcome": "SUCCESS",
                  "duration": 10,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-27T05:25:34.371Z",
                  "location": {
                    "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/sebas/actors.ts",
                    "line": 37,
                    "column": 22
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-27T05-25-28.819Z/screenshot-win32-chromium-156-0-4314-42-preparador-se-asegura-de-que-exista-40ad070d69.png",
                      "type": "screenshot"
                    }
                  ]
                },
                {
                  "name": "Preparador se asegura de que exista la cuenta tomas.coach@udem.edu.co",
                  "outcome": "SUCCESS",
                  "duration": 19,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-27T05:25:34.582Z",
                  "location": {
                    "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/sebas/actors.ts",
                    "line": 38,
                    "column": 22
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-27T05-25-28.819Z/screenshot-win32-chromium-156-0-4314-42-preparador-se-asegura-de-que-exista-40ad070d69.png",
                      "type": "screenshot"
                    }
                  ]
                },
                {
                  "name": "Preparador deja a laura.est@soyudemedellin.edu.co sin reservas activas",
                  "outcome": "SUCCESS",
                  "duration": 10,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-27T05:25:34.640Z",
                  "location": {
                    "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/sebas/actors.ts",
                    "line": 39,
                    "column": 30
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-27T05-25-28.819Z/screenshot-win32-chromium-156-0-4314-42-preparador-deja-a-laura-est-soyudem-40ad070d69.png",
                      "type": "screenshot"
                    }
                  ]
                }
              ],
              "type": "Task",
              "startedAt": "2026-10-27T05:25:34.369Z",
              "location": {
                "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/sebas/actors.ts",
                "line": 27
              }
            },
            {
              "name": "Dado que Laura tiene una reserva para mañana en el bloque 1",
              "outcome": "SUCCESS",
              "duration": 109,
              "children": [
                {
                  "name": "Preparador reserva por la API el bloque 1 para laura.est@soyudemedellin.edu.co",
                  "outcome": "SUCCESS",
                  "duration": 53,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-27T05:25:34.709Z",
                  "location": {
                    "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/step-definitions/sebas-e2e.steps.ts",
                    "line": 19,
                    "column": 63
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-27T05-25-28.819Z/screenshot-win32-chromium-156-0-4314-42-preparador-reserva-por-la-api-el-bl-40ad070d69.png",
                      "type": "screenshot"
                    }
                  ]
                }
              ],
              "type": "Task",
              "startedAt": "2026-10-27T05:25:34.708Z",
              "location": {
                "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/sebas-e2e.feature",
                "line": 32
              }
            },
            {
              "name": "Y que Tomás entró como entrenador",
              "outcome": "SUCCESS",
              "duration": 1038,
              "children": [
                {
                  "name": "Tomás inicia sesión como tomas.coach@udem.edu.co",
                  "outcome": "SUCCESS",
                  "duration": 876,
                  "children": [
                    {
                      "name": "Tomás navigates to \"http://localhost:5173\"",
                      "outcome": "SUCCESS",
                      "duration": 228,
                      "children": [],
                      "type": "Interaction",
                      "startedAt": "2026-10-27T05:25:34.824Z",
                      "location": {
                        "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/step-definitions/sebas-e2e.steps.ts",
                        "line": 27,
                        "column": 54
                      },
                      "artifacts": [
                        {
                          "path": "test-runs/2026-10-27T05-25-28.819Z/screenshot-win32-chromium-156-0-4314-42-tom-s-navigates-to--http---localhos-33b4179048.png",
                          "type": "screenshot"
                        }
                      ]
                    },
                    {
                      "name": "Tomás enters \"tomas.coach@udem.edu.co\" into campo correo",
                      "outcome": "SUCCESS",
                      "duration": 23,
                      "children": [],
                      "type": "Interaction",
                      "startedAt": "2026-10-27T05:25:35.181Z",
                      "location": {
                        "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/camila/tasks.ts",
                        "line": 15,
                        "column": 36
                      },
                      "artifacts": [
                        {
                          "path": "test-runs/2026-10-27T05-25-28.819Z/screenshot-win32-chromium-156-0-4314-42-tom-s-enters--tomas-coach-udem-edu--a527d679f7.png",
                          "type": "screenshot"
                        }
                      ]
                    },
                    {
                      "name": "Tomás enters \"1000000002\" into campo documento (contraseña)",
                      "outcome": "SUCCESS",
                      "duration": 10,
                      "children": [],
                      "type": "Interaction",
                      "startedAt": "2026-10-27T05:25:35.292Z",
                      "location": {
                        "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/camila/tasks.ts",
                        "line": 16,
                        "column": 40
                      },
                      "artifacts": [
                        {
                          "path": "test-runs/2026-10-27T05-25-28.819Z/screenshot-win32-chromium-156-0-4314-42-tom-s-enters--1000000002--into-camp-05e5b41bee.png",
                          "type": "screenshot"
                        }
                      ]
                    },
                    {
                      "name": "Tomás clicks on botón ingresar",
                      "outcome": "SUCCESS",
                      "duration": 219,
                      "children": [],
                      "type": "Interaction",
                      "startedAt": "2026-10-27T05:25:35.385Z",
                      "location": {
                        "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/camila/tasks.ts",
                        "line": 17,
                        "column": 13
                      },
                      "artifacts": [
                        {
                          "path": "test-runs/2026-10-27T05-25-28.819Z/screenshot-win32-chromium-156-0-4314-42-tom-s-clicks-on-bot-n-ingresar-a1391d5f19.png",
                          "type": "screenshot"
                        }
                      ]
                    }
                  ],
                  "type": "Task",
                  "startedAt": "2026-10-27T05:25:34.824Z",
                  "location": {
                    "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/step-definitions/sebas-e2e.steps.ts",
                    "line": 27,
                    "column": 54
                  }
                },
                {
                  "name": "Tomás waits until buscador de estudiantes does become visible",
                  "outcome": "SUCCESS",
                  "duration": 89,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-27T05:25:35.715Z",
                  "location": {
                    "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/step-definitions/sebas-e2e.steps.ts",
                    "line": 27,
                    "column": 78
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-27T05-25-28.819Z/screenshot-win32-chromium-156-0-4314-42-tom-s-waits-until-buscador-de-estud-85092fdcc1.png",
                      "type": "screenshot"
                    }
                  ]
                }
              ],
              "type": "Task",
              "startedAt": "2026-10-27T05:25:34.818Z",
              "location": {
                "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/sebas-e2e.feature",
                "line": 33
              }
            },
            {
              "name": "Cuando consulta en el buscador el documento \"1000000003\"",
              "outcome": "SUCCESS",
              "duration": 468,
              "children": [
                {
                  "name": "Tomás busca en el panel el documento 1000000003",
                  "outcome": "SUCCESS",
                  "duration": 446,
                  "children": [
                    {
                      "name": "Tomás waits until campo documento del estudiante does become visible",
                      "outcome": "SUCCESS",
                      "duration": 41,
                      "children": [],
                      "type": "Interaction",
                      "startedAt": "2026-10-27T05:25:35.862Z",
                      "location": {
                        "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/sebas/tasks.ts",
                        "line": 38,
                        "column": 7
                      },
                      "artifacts": [
                        {
                          "path": "test-runs/2026-10-27T05-25-28.819Z/screenshot-win32-chromium-156-0-4314-42-tom-s-waits-until-campo-documento-d-00e5ec0480.png",
                          "type": "screenshot"
                        }
                      ]
                    },
                    {
                      "name": "Tomás enters \"1000000003\" into campo documento del estudiante",
                      "outcome": "SUCCESS",
                      "duration": 7,
                      "children": [],
                      "type": "Interaction",
                      "startedAt": "2026-10-27T05:25:35.965Z",
                      "location": {
                        "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/sebas/tasks.ts",
                        "line": 39,
                        "column": 33
                      },
                      "artifacts": [
                        {
                          "path": "test-runs/2026-10-27T05-25-28.819Z/screenshot-win32-chromium-156-0-4314-42-tom-s-enters--1000000003--into-camp-d27d80509a.png",
                          "type": "screenshot"
                        }
                      ]
                    },
                    {
                      "name": "Tomás clicks on botón Buscar",
                      "outcome": "SUCCESS",
                      "duration": 204,
                      "children": [],
                      "type": "Interaction",
                      "startedAt": "2026-10-27T05:25:36.043Z",
                      "location": {
                        "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/sebas/tasks.ts",
                        "line": 40,
                        "column": 13
                      },
                      "artifacts": [
                        {
                          "path": "test-runs/2026-10-27T05-25-28.819Z/screenshot-win32-chromium-156-0-4314-42-tom-s-clicks-on-bot-n-buscar-f6f0b06462.png",
                          "type": "screenshot"
                        }
                      ]
                    }
                  ],
                  "type": "Task",
                  "startedAt": "2026-10-27T05:25:35.862Z",
                  "location": {
                    "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/step-definitions/sebas-e2e.steps.ts",
                    "line": 71,
                    "column": 60
                  }
                }
              ],
              "type": "Task",
              "startedAt": "2026-10-27T05:25:35.856Z",
              "location": {
                "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/sebas-e2e.feature",
                "line": 34
              }
            },
            {
              "name": "Entonces debe aparecer la estudiante \"Laura Estudiante\" con su reserva de las \"06:00\"",
              "outcome": "SUCCESS",
              "duration": 159,
              "children": [
                {
                  "name": "Tomás ensures that the text of nombre del estudiante encontrado does eventually equal \"Laura Estudiante\"",
                  "outcome": "SUCCESS",
                  "duration": 14,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-27T05:25:36.329Z",
                  "location": {
                    "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/step-definitions/sebas-e2e.steps.ts",
                    "line": 76,
                    "column": 12
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-27T05-25-28.819Z/screenshot-win32-chromium-156-0-4314-42-tom-s-ensures-that-the-text-of-nomb-856ea34d65.png",
                      "type": "screenshot"
                    }
                  ]
                },
                {
                  "name": "Tomás ensures that the text of bloque de la reserva encontrada does eventually include \"06:00\"",
                  "outcome": "SUCCESS",
                  "duration": 19,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-27T05:25:36.403Z",
                  "location": {
                    "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/step-definitions/sebas-e2e.steps.ts",
                    "line": 77,
                    "column": 12
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-27T05-25-28.819Z/screenshot-win32-chromium-156-0-4314-42-tom-s-ensures-that-the-text-of-bloq-c9a645ccb1.png",
                      "type": "screenshot"
                    }
                  ]
                }
              ],
              "type": "Task",
              "startedAt": "2026-10-27T05:25:36.324Z",
              "location": {
                "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/sebas-e2e.feature",
                "line": 35
              }
            },
            {
              "name": "After",
              "outcome": "SUCCESS",
              "duration": 2,
              "children": [],
              "type": "Task",
              "startedAt": "2026-10-27T05:25:36.483Z",
              "location": {
                "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/sebas/actors.ts",
                "line": 43
              }
            }
          ]
        }
      ],
      "narrative": "<p>Como estudiante o entrenador del gimnasio UdeM\nQuiero usar la interfaz web\nPara comprobar de punta a punta RF06, RF07, RF08, RF09 y RF10</p>\n",
      "cast": [
        {
          "name": "Preparador",
          "abilities": [
            {
              "name": "PerformActivities"
            },
            {
              "name": "AnswerQuestions"
            },
            {
              "name": "RaiseErrors"
            },
            {
              "name": "ScheduleWork",
              "details": "{\"scheduler\":{\"clock\":{\"timeAdjustment\":{\"milliseconds\":0}},\"interactionTimeout\":{\"milliseconds\":5000}}}"
            },
            {
              "name": "BrowseTheWebWithPlaywright"
            },
            {
              "name": "ConsultarLaBaseDeDatos"
            }
          ]
        },
        {
          "name": "Tomás",
          "abilities": [
            {
              "name": "PerformActivities"
            },
            {
              "name": "AnswerQuestions"
            },
            {
              "name": "RaiseErrors"
            },
            {
              "name": "ScheduleWork",
              "details": "{\"scheduler\":{\"clock\":{\"timeAdjustment\":{\"milliseconds\":0}},\"interactionTimeout\":{\"milliseconds\":5000}}}"
            },
            {
              "name": "BrowseTheWebWithPlaywright"
            },
            {
              "name": "ConsultarLaBaseDeDatos"
            }
          ]
        }
      ],
      "id": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/sebas-e2e.feature:31"
    },
    {
      "name": "El entrenador escribe un documento con formato inválido (RF10 error)",
      "category": "E2E de navegador - reservas del estudiante y búsqueda del entrenador",
      "outcome": "SUCCESS",
      "duration": 2125,
      "startedAt": "2026-10-27T05:25:36.580Z",
      "source": {
        "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/sebas-e2e.feature",
        "line": 38
      },
      "tags": [
        {
          "type": "feature",
          "name": "E2E de navegador - reservas del estudiante y búsqueda del entrenador"
        },
        {
          "type": "tag",
          "name": "sebas-e2e"
        },
        {
          "type": "tag",
          "name": "rf10"
        }
      ],
      "activities": [
        {
          "name": "Before",
          "outcome": "SUCCESS",
          "duration": 414,
          "children": [
            {
              "name": "Preparador se asegura de que exista la cuenta laura.est@soyudemedellin.edu.co",
              "outcome": "SUCCESS",
              "duration": 10,
              "children": [],
              "type": "Interaction",
              "startedAt": "2026-10-27T05:25:36.585Z",
              "location": {
                "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/sebas/actors.ts",
                "line": 37,
                "column": 22
              },
              "artifacts": [
                {
                  "path": "test-runs/2026-10-27T05-25-28.819Z/screenshot-win32-chromium-156-0-4314-42-preparador-se-asegura-de-que-exista-40ad070d69.png",
                  "type": "screenshot"
                }
              ]
            },
            {
              "name": "Preparador se asegura de que exista la cuenta tomas.coach@udem.edu.co",
              "outcome": "SUCCESS",
              "duration": 19,
              "children": [],
              "type": "Interaction",
              "startedAt": "2026-10-27T05:25:36.853Z",
              "location": {
                "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/sebas/actors.ts",
                "line": 38,
                "column": 22
              },
              "artifacts": [
                {
                  "path": "test-runs/2026-10-27T05-25-28.819Z/screenshot-win32-chromium-156-0-4314-42-preparador-se-asegura-de-que-exista-40ad070d69.png",
                  "type": "screenshot"
                }
              ]
            },
            {
              "name": "Preparador deja a laura.est@soyudemedellin.edu.co sin reservas activas",
              "outcome": "SUCCESS",
              "duration": 15,
              "children": [],
              "type": "Interaction",
              "startedAt": "2026-10-27T05:25:36.931Z",
              "location": {
                "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/sebas/actors.ts",
                "line": 39,
                "column": 30
              },
              "artifacts": [
                {
                  "path": "test-runs/2026-10-27T05-25-28.819Z/screenshot-win32-chromium-156-0-4314-42-preparador-deja-a-laura-est-soyudem-40ad070d69.png",
                  "type": "screenshot"
                }
              ]
            }
          ],
          "type": "Task",
          "startedAt": "2026-10-27T05:25:36.581Z",
          "location": {
            "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/sebas/actors.ts",
            "line": 27
          }
        },
        {
          "name": "Dado que Tomás entró como entrenador",
          "outcome": "SUCCESS",
          "duration": 1084,
          "children": [
            {
              "name": "Tomás inicia sesión como tomas.coach@udem.edu.co",
              "outcome": "SUCCESS",
              "duration": 854,
              "children": [
                {
                  "name": "Tomás navigates to \"http://localhost:5173\"",
                  "outcome": "SUCCESS",
                  "duration": 239,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-27T05:25:37.004Z",
                  "location": {
                    "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/step-definitions/sebas-e2e.steps.ts",
                    "line": 27,
                    "column": 54
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-27T05-25-28.819Z/screenshot-win32-chromium-156-0-4314-42-tom-s-navigates-to--http---localhos-33b4179048.png",
                      "type": "screenshot"
                    }
                  ]
                },
                {
                  "name": "Tomás enters \"tomas.coach@udem.edu.co\" into campo correo",
                  "outcome": "SUCCESS",
                  "duration": 24,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-27T05:25:37.356Z",
                  "location": {
                    "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/camila/tasks.ts",
                    "line": 15,
                    "column": 36
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-27T05-25-28.819Z/screenshot-win32-chromium-156-0-4314-42-tom-s-enters--tomas-coach-udem-edu--766a17da3f.png",
                      "type": "screenshot"
                    }
                  ]
                },
                {
                  "name": "Tomás enters \"1000000002\" into campo documento (contraseña)",
                  "outcome": "SUCCESS",
                  "duration": 9,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-27T05:25:37.470Z",
                  "location": {
                    "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/camila/tasks.ts",
                    "line": 16,
                    "column": 40
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-27T05-25-28.819Z/screenshot-win32-chromium-156-0-4314-42-tom-s-enters--1000000002--into-camp-f0d755ddd0.png",
                      "type": "screenshot"
                    }
                  ]
                },
                {
                  "name": "Tomás clicks on botón ingresar",
                  "outcome": "SUCCESS",
                  "duration": 211,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-27T05:25:37.564Z",
                  "location": {
                    "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/camila/tasks.ts",
                    "line": 17,
                    "column": 13
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-27T05-25-28.819Z/screenshot-win32-chromium-156-0-4314-42-tom-s-clicks-on-bot-n-ingresar-419aef2c32.png",
                      "type": "screenshot"
                    }
                  ]
                }
              ],
              "type": "Task",
              "startedAt": "2026-10-27T05:25:37.004Z",
              "location": {
                "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/step-definitions/sebas-e2e.steps.ts",
                "line": 27,
                "column": 54
              }
            },
            {
              "name": "Tomás waits until buscador de estudiantes does become visible",
              "outcome": "SUCCESS",
              "duration": 131,
              "children": [],
              "type": "Interaction",
              "startedAt": "2026-10-27T05:25:37.874Z",
              "location": {
                "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/step-definitions/sebas-e2e.steps.ts",
                "line": 27,
                "column": 78
              },
              "artifacts": [
                {
                  "path": "test-runs/2026-10-27T05-25-28.819Z/screenshot-win32-chromium-156-0-4314-42-tom-s-waits-until-buscador-de-estud-6674b4c33e.png",
                  "type": "screenshot"
                }
              ]
            }
          ],
          "type": "Task",
          "startedAt": "2026-10-27T05:25:36.995Z",
          "location": {
            "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/sebas-e2e.feature",
            "line": 39
          }
        },
        {
          "name": "Cuando consulta en el buscador el documento \"abc\"",
          "outcome": "SUCCESS",
          "duration": 453,
          "children": [
            {
              "name": "Tomás busca en el panel el documento abc",
              "outcome": "SUCCESS",
              "duration": 434,
              "children": [
                {
                  "name": "Tomás waits until campo documento del estudiante does become visible",
                  "outcome": "SUCCESS",
                  "duration": 24,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-27T05:25:38.083Z",
                  "location": {
                    "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/sebas/tasks.ts",
                    "line": 38,
                    "column": 7
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-27T05-25-28.819Z/screenshot-win32-chromium-156-0-4314-42-tom-s-waits-until-campo-documento-d-21d95acca9.png",
                      "type": "screenshot"
                    }
                  ]
                },
                {
                  "name": "Tomás enters \"abc\" into campo documento del estudiante",
                  "outcome": "SUCCESS",
                  "duration": 7,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-27T05:25:38.172Z",
                  "location": {
                    "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/sebas/tasks.ts",
                    "line": 39,
                    "column": 33
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-27T05-25-28.819Z/screenshot-win32-chromium-156-0-4314-42-tom-s-enters--abc--into-campo-docum-27ea4eb923.png",
                      "type": "screenshot"
                    }
                  ]
                },
                {
                  "name": "Tomás clicks on botón Buscar",
                  "outcome": "SUCCESS",
                  "duration": 201,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-27T05:25:38.251Z",
                  "location": {
                    "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/sebas/tasks.ts",
                    "line": 40,
                    "column": 13
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-27T05-25-28.819Z/screenshot-win32-chromium-156-0-4314-42-tom-s-clicks-on-bot-n-buscar-14a14dd5ab.png",
                      "type": "screenshot"
                    }
                  ]
                }
              ],
              "type": "Task",
              "startedAt": "2026-10-27T05:25:38.083Z",
              "location": {
                "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/step-definitions/sebas-e2e.steps.ts",
                "line": 71,
                "column": 60
              }
            }
          ],
          "type": "Task",
          "startedAt": "2026-10-27T05:25:38.080Z",
          "location": {
            "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/sebas-e2e.feature",
            "line": 40
          }
        },
        {
          "name": "Entonces debe ver bajo el buscador el error \"El documento tiene 10 dígitos, sin letras, puntos ni espacios.\"",
          "outcome": "SUCCESS",
          "duration": 78,
          "children": [
            {
              "name": "Tomás ensures that the text of error del buscador does eventually equal \"El documento tiene 10 dígitos, sin letras, puntos ni espacios.\"",
              "outcome": "SUCCESS",
              "duration": 15,
              "children": [],
              "type": "Interaction",
              "startedAt": "2026-10-27T05:25:38.536Z",
              "location": {
                "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/step-definitions/sebas-e2e.steps.ts",
                "line": 82,
                "column": 49
              },
              "artifacts": [
                {
                  "path": "test-runs/2026-10-27T05-25-28.819Z/screenshot-win32-chromium-156-0-4314-42-tom-s-ensures-that-the-text-of-erro-664466bb5b.png",
                  "type": "screenshot"
                }
              ]
            }
          ],
          "type": "Task",
          "startedAt": "2026-10-27T05:25:38.534Z",
          "location": {
            "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/sebas-e2e.feature",
            "line": 41
          }
        },
        {
          "name": "After",
          "outcome": "SUCCESS",
          "duration": 2,
          "children": [],
          "type": "Task",
          "startedAt": "2026-10-27T05:25:38.613Z",
          "location": {
            "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/sebas/actors.ts",
            "line": 43
          }
        }
      ],
      "executionHistory": [
        {
          "outcome": "SUCCESS",
          "run": "2026-10-27T05-21-21.384Z",
          "timestamp": "2026-10-27T05:21:21.207Z",
          "duration": 1972,
          "activities": [
            {
              "name": "Before",
              "outcome": "SUCCESS",
              "duration": 306,
              "children": [
                {
                  "name": "Preparador se asegura de que exista la cuenta laura.est@soyudemedellin.edu.co",
                  "outcome": "SUCCESS",
                  "duration": 6,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-27T05:21:36.469Z",
                  "location": {
                    "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/sebas/actors.ts",
                    "line": 37,
                    "column": 22
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-27T05-21-21.384Z/screenshot-win32-chromium-156-0-4314-42-preparador-se-asegura-de-que-exista-40ad070d69.png",
                      "type": "screenshot"
                    }
                  ]
                },
                {
                  "name": "Preparador se asegura de que exista la cuenta tomas.coach@udem.edu.co",
                  "outcome": "SUCCESS",
                  "duration": 18,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-27T05:21:36.632Z",
                  "location": {
                    "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/sebas/actors.ts",
                    "line": 38,
                    "column": 22
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-27T05-21-21.384Z/screenshot-win32-chromium-156-0-4314-42-preparador-se-asegura-de-que-exista-40ad070d69.png",
                      "type": "screenshot"
                    }
                  ]
                },
                {
                  "name": "Preparador deja a laura.est@soyudemedellin.edu.co sin reservas activas",
                  "outcome": "SUCCESS",
                  "duration": 10,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-27T05:21:36.709Z",
                  "location": {
                    "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/sebas/actors.ts",
                    "line": 39,
                    "column": 30
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-27T05-21-21.384Z/screenshot-win32-chromium-156-0-4314-42-preparador-deja-a-laura-est-soyudem-40ad070d69.png",
                      "type": "screenshot"
                    }
                  ]
                }
              ],
              "type": "Task",
              "startedAt": "2026-10-27T05:21:36.467Z",
              "location": {
                "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/sebas/actors.ts",
                "line": 27
              }
            },
            {
              "name": "Dado que Tomás entró como entrenador",
              "outcome": "SUCCESS",
              "duration": 1036,
              "children": [
                {
                  "name": "Tomás inicia sesión como tomas.coach@udem.edu.co",
                  "outcome": "SUCCESS",
                  "duration": 827,
                  "children": [
                    {
                      "name": "Tomás navigates to \"http://localhost:5173\"",
                      "outcome": "SUCCESS",
                      "duration": 236,
                      "children": [],
                      "type": "Interaction",
                      "startedAt": "2026-10-27T05:21:36.778Z",
                      "location": {
                        "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/step-definitions/sebas-e2e.steps.ts",
                        "line": 27,
                        "column": 54
                      },
                      "artifacts": [
                        {
                          "path": "test-runs/2026-10-27T05-21-21.384Z/screenshot-win32-chromium-156-0-4314-42-tom-s-navigates-to--http---localhos-afa80f90fc.png",
                          "type": "screenshot"
                        }
                      ]
                    },
                    {
                      "name": "Tomás enters \"tomas.coach@udem.edu.co\" into campo correo",
                      "outcome": "SUCCESS",
                      "duration": 23,
                      "children": [],
                      "type": "Interaction",
                      "startedAt": "2026-10-27T05:21:37.130Z",
                      "location": {
                        "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/camila/tasks.ts",
                        "line": 15,
                        "column": 36
                      },
                      "artifacts": [
                        {
                          "path": "test-runs/2026-10-27T05-21-21.384Z/screenshot-win32-chromium-156-0-4314-42-tom-s-enters--tomas-coach-udem-edu--455faab661.png",
                          "type": "screenshot"
                        }
                      ]
                    },
                    {
                      "name": "Tomás enters \"1000000002\" into campo documento (contraseña)",
                      "outcome": "SUCCESS",
                      "duration": 9,
                      "children": [],
                      "type": "Interaction",
                      "startedAt": "2026-10-27T05:21:37.223Z",
                      "location": {
                        "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/camila/tasks.ts",
                        "line": 16,
                        "column": 40
                      },
                      "artifacts": [
                        {
                          "path": "test-runs/2026-10-27T05-21-21.384Z/screenshot-win32-chromium-156-0-4314-42-tom-s-enters--1000000002--into-camp-7582d6abb7.png",
                          "type": "screenshot"
                        }
                      ]
                    },
                    {
                      "name": "Tomás clicks on botón ingresar",
                      "outcome": "SUCCESS",
                      "duration": 213,
                      "children": [],
                      "type": "Interaction",
                      "startedAt": "2026-10-27T05:21:37.308Z",
                      "location": {
                        "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/camila/tasks.ts",
                        "line": 17,
                        "column": 13
                      },
                      "artifacts": [
                        {
                          "path": "test-runs/2026-10-27T05-21-21.384Z/screenshot-win32-chromium-156-0-4314-42-tom-s-clicks-on-bot-n-ingresar-7c2ec1804d.png",
                          "type": "screenshot"
                        }
                      ]
                    }
                  ],
                  "type": "Task",
                  "startedAt": "2026-10-27T05:21:36.778Z",
                  "location": {
                    "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/step-definitions/sebas-e2e.steps.ts",
                    "line": 27,
                    "column": 54
                  }
                },
                {
                  "name": "Tomás waits until buscador de estudiantes does become visible",
                  "outcome": "SUCCESS",
                  "duration": 127,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-27T05:21:37.621Z",
                  "location": {
                    "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/step-definitions/sebas-e2e.steps.ts",
                    "line": 27,
                    "column": 78
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-27T05-21-21.384Z/screenshot-win32-chromium-156-0-4314-42-tom-s-waits-until-buscador-de-estud-a2900abe79.png",
                      "type": "screenshot"
                    }
                  ]
                }
              ],
              "type": "Task",
              "startedAt": "2026-10-27T05:21:36.773Z",
              "location": {
                "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/sebas-e2e.feature",
                "line": 39
              }
            },
            {
              "name": "Cuando consulta en el buscador el documento \"abc\"",
              "outcome": "SUCCESS",
              "duration": 471,
              "children": [
                {
                  "name": "Tomás busca en el panel el documento abc",
                  "outcome": "SUCCESS",
                  "duration": 446,
                  "children": [
                    {
                      "name": "Tomás waits until campo documento del estudiante does become visible",
                      "outcome": "SUCCESS",
                      "duration": 24,
                      "children": [],
                      "type": "Interaction",
                      "startedAt": "2026-10-27T05:21:37.813Z",
                      "location": {
                        "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/sebas/tasks.ts",
                        "line": 39,
                        "column": 7
                      },
                      "artifacts": [
                        {
                          "path": "test-runs/2026-10-27T05-21-21.384Z/screenshot-win32-chromium-156-0-4314-42-tom-s-waits-until-campo-documento-d-5d135b081b.png",
                          "type": "screenshot"
                        }
                      ]
                    },
                    {
                      "name": "Tomás enters \"abc\" into campo documento del estudiante",
                      "outcome": "SUCCESS",
                      "duration": 11,
                      "children": [],
                      "type": "Interaction",
                      "startedAt": "2026-10-27T05:21:37.903Z",
                      "location": {
                        "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/sebas/tasks.ts",
                        "line": 40,
                        "column": 33
                      },
                      "artifacts": [
                        {
                          "path": "test-runs/2026-10-27T05-21-21.384Z/screenshot-win32-chromium-156-0-4314-42-tom-s-enters--abc--into-campo-docum-ac65bd73f1.png",
                          "type": "screenshot"
                        }
                      ]
                    },
                    {
                      "name": "Tomás clicks on botón Buscar",
                      "outcome": "SUCCESS",
                      "duration": 201,
                      "children": [],
                      "type": "Interaction",
                      "startedAt": "2026-10-27T05:21:37.997Z",
                      "location": {
                        "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/sebas/tasks.ts",
                        "line": 41,
                        "column": 13
                      },
                      "artifacts": [
                        {
                          "path": "test-runs/2026-10-27T05-21-21.384Z/screenshot-win32-chromium-156-0-4314-42-tom-s-clicks-on-bot-n-buscar-361b608cc4.png",
                          "type": "screenshot"
                        }
                      ]
                    }
                  ],
                  "type": "Task",
                  "startedAt": "2026-10-27T05:21:37.813Z",
                  "location": {
                    "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/step-definitions/sebas-e2e.steps.ts",
                    "line": 71,
                    "column": 60
                  }
                }
              ],
              "type": "Task",
              "startedAt": "2026-10-27T05:21:37.809Z",
              "location": {
                "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/sebas-e2e.feature",
                "line": 40
              }
            },
            {
              "name": "Entonces debe ver bajo el buscador el error \"El documento tiene 10 dígitos, sin letras, puntos ni espacios.\"",
              "outcome": "SUCCESS",
              "duration": 73,
              "children": [
                {
                  "name": "Tomás ensures that the text of error del buscador does eventually equal \"El documento tiene 10 dígitos, sin letras, puntos ni espacios.\"",
                  "outcome": "SUCCESS",
                  "duration": 17,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-27T05:21:38.283Z",
                  "location": {
                    "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/step-definitions/sebas-e2e.steps.ts",
                    "line": 82,
                    "column": 49
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-27T05-21-21.384Z/screenshot-win32-chromium-156-0-4314-42-tom-s-ensures-that-the-text-of-erro-5d7688ac6f.png",
                      "type": "screenshot"
                    }
                  ]
                }
              ],
              "type": "Task",
              "startedAt": "2026-10-27T05:21:38.280Z",
              "location": {
                "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/sebas-e2e.feature",
                "line": 41
              }
            },
            {
              "name": "After",
              "outcome": "SUCCESS",
              "duration": 2,
              "children": [],
              "type": "Task",
              "startedAt": "2026-10-27T05:21:38.354Z",
              "location": {
                "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/sebas/actors.ts",
                "line": 43
              }
            }
          ]
        },
        {
          "outcome": "SUCCESS",
          "run": "2026-10-27T05-25-28.819Z",
          "timestamp": "2026-10-27T05:25:28.133Z",
          "duration": 2125,
          "activities": [
            {
              "name": "Before",
              "outcome": "SUCCESS",
              "duration": 414,
              "children": [
                {
                  "name": "Preparador se asegura de que exista la cuenta laura.est@soyudemedellin.edu.co",
                  "outcome": "SUCCESS",
                  "duration": 10,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-27T05:25:36.585Z",
                  "location": {
                    "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/sebas/actors.ts",
                    "line": 37,
                    "column": 22
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-27T05-25-28.819Z/screenshot-win32-chromium-156-0-4314-42-preparador-se-asegura-de-que-exista-40ad070d69.png",
                      "type": "screenshot"
                    }
                  ]
                },
                {
                  "name": "Preparador se asegura de que exista la cuenta tomas.coach@udem.edu.co",
                  "outcome": "SUCCESS",
                  "duration": 19,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-27T05:25:36.853Z",
                  "location": {
                    "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/sebas/actors.ts",
                    "line": 38,
                    "column": 22
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-27T05-25-28.819Z/screenshot-win32-chromium-156-0-4314-42-preparador-se-asegura-de-que-exista-40ad070d69.png",
                      "type": "screenshot"
                    }
                  ]
                },
                {
                  "name": "Preparador deja a laura.est@soyudemedellin.edu.co sin reservas activas",
                  "outcome": "SUCCESS",
                  "duration": 15,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-27T05:25:36.931Z",
                  "location": {
                    "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/sebas/actors.ts",
                    "line": 39,
                    "column": 30
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-27T05-25-28.819Z/screenshot-win32-chromium-156-0-4314-42-preparador-deja-a-laura-est-soyudem-40ad070d69.png",
                      "type": "screenshot"
                    }
                  ]
                }
              ],
              "type": "Task",
              "startedAt": "2026-10-27T05:25:36.581Z",
              "location": {
                "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/sebas/actors.ts",
                "line": 27
              }
            },
            {
              "name": "Dado que Tomás entró como entrenador",
              "outcome": "SUCCESS",
              "duration": 1084,
              "children": [
                {
                  "name": "Tomás inicia sesión como tomas.coach@udem.edu.co",
                  "outcome": "SUCCESS",
                  "duration": 854,
                  "children": [
                    {
                      "name": "Tomás navigates to \"http://localhost:5173\"",
                      "outcome": "SUCCESS",
                      "duration": 239,
                      "children": [],
                      "type": "Interaction",
                      "startedAt": "2026-10-27T05:25:37.004Z",
                      "location": {
                        "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/step-definitions/sebas-e2e.steps.ts",
                        "line": 27,
                        "column": 54
                      },
                      "artifacts": [
                        {
                          "path": "test-runs/2026-10-27T05-25-28.819Z/screenshot-win32-chromium-156-0-4314-42-tom-s-navigates-to--http---localhos-33b4179048.png",
                          "type": "screenshot"
                        }
                      ]
                    },
                    {
                      "name": "Tomás enters \"tomas.coach@udem.edu.co\" into campo correo",
                      "outcome": "SUCCESS",
                      "duration": 24,
                      "children": [],
                      "type": "Interaction",
                      "startedAt": "2026-10-27T05:25:37.356Z",
                      "location": {
                        "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/camila/tasks.ts",
                        "line": 15,
                        "column": 36
                      },
                      "artifacts": [
                        {
                          "path": "test-runs/2026-10-27T05-25-28.819Z/screenshot-win32-chromium-156-0-4314-42-tom-s-enters--tomas-coach-udem-edu--766a17da3f.png",
                          "type": "screenshot"
                        }
                      ]
                    },
                    {
                      "name": "Tomás enters \"1000000002\" into campo documento (contraseña)",
                      "outcome": "SUCCESS",
                      "duration": 9,
                      "children": [],
                      "type": "Interaction",
                      "startedAt": "2026-10-27T05:25:37.470Z",
                      "location": {
                        "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/camila/tasks.ts",
                        "line": 16,
                        "column": 40
                      },
                      "artifacts": [
                        {
                          "path": "test-runs/2026-10-27T05-25-28.819Z/screenshot-win32-chromium-156-0-4314-42-tom-s-enters--1000000002--into-camp-f0d755ddd0.png",
                          "type": "screenshot"
                        }
                      ]
                    },
                    {
                      "name": "Tomás clicks on botón ingresar",
                      "outcome": "SUCCESS",
                      "duration": 211,
                      "children": [],
                      "type": "Interaction",
                      "startedAt": "2026-10-27T05:25:37.564Z",
                      "location": {
                        "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/camila/tasks.ts",
                        "line": 17,
                        "column": 13
                      },
                      "artifacts": [
                        {
                          "path": "test-runs/2026-10-27T05-25-28.819Z/screenshot-win32-chromium-156-0-4314-42-tom-s-clicks-on-bot-n-ingresar-419aef2c32.png",
                          "type": "screenshot"
                        }
                      ]
                    }
                  ],
                  "type": "Task",
                  "startedAt": "2026-10-27T05:25:37.004Z",
                  "location": {
                    "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/step-definitions/sebas-e2e.steps.ts",
                    "line": 27,
                    "column": 54
                  }
                },
                {
                  "name": "Tomás waits until buscador de estudiantes does become visible",
                  "outcome": "SUCCESS",
                  "duration": 131,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-27T05:25:37.874Z",
                  "location": {
                    "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/step-definitions/sebas-e2e.steps.ts",
                    "line": 27,
                    "column": 78
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-27T05-25-28.819Z/screenshot-win32-chromium-156-0-4314-42-tom-s-waits-until-buscador-de-estud-6674b4c33e.png",
                      "type": "screenshot"
                    }
                  ]
                }
              ],
              "type": "Task",
              "startedAt": "2026-10-27T05:25:36.995Z",
              "location": {
                "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/sebas-e2e.feature",
                "line": 39
              }
            },
            {
              "name": "Cuando consulta en el buscador el documento \"abc\"",
              "outcome": "SUCCESS",
              "duration": 453,
              "children": [
                {
                  "name": "Tomás busca en el panel el documento abc",
                  "outcome": "SUCCESS",
                  "duration": 434,
                  "children": [
                    {
                      "name": "Tomás waits until campo documento del estudiante does become visible",
                      "outcome": "SUCCESS",
                      "duration": 24,
                      "children": [],
                      "type": "Interaction",
                      "startedAt": "2026-10-27T05:25:38.083Z",
                      "location": {
                        "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/sebas/tasks.ts",
                        "line": 38,
                        "column": 7
                      },
                      "artifacts": [
                        {
                          "path": "test-runs/2026-10-27T05-25-28.819Z/screenshot-win32-chromium-156-0-4314-42-tom-s-waits-until-campo-documento-d-21d95acca9.png",
                          "type": "screenshot"
                        }
                      ]
                    },
                    {
                      "name": "Tomás enters \"abc\" into campo documento del estudiante",
                      "outcome": "SUCCESS",
                      "duration": 7,
                      "children": [],
                      "type": "Interaction",
                      "startedAt": "2026-10-27T05:25:38.172Z",
                      "location": {
                        "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/sebas/tasks.ts",
                        "line": 39,
                        "column": 33
                      },
                      "artifacts": [
                        {
                          "path": "test-runs/2026-10-27T05-25-28.819Z/screenshot-win32-chromium-156-0-4314-42-tom-s-enters--abc--into-campo-docum-27ea4eb923.png",
                          "type": "screenshot"
                        }
                      ]
                    },
                    {
                      "name": "Tomás clicks on botón Buscar",
                      "outcome": "SUCCESS",
                      "duration": 201,
                      "children": [],
                      "type": "Interaction",
                      "startedAt": "2026-10-27T05:25:38.251Z",
                      "location": {
                        "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/sebas/tasks.ts",
                        "line": 40,
                        "column": 13
                      },
                      "artifacts": [
                        {
                          "path": "test-runs/2026-10-27T05-25-28.819Z/screenshot-win32-chromium-156-0-4314-42-tom-s-clicks-on-bot-n-buscar-14a14dd5ab.png",
                          "type": "screenshot"
                        }
                      ]
                    }
                  ],
                  "type": "Task",
                  "startedAt": "2026-10-27T05:25:38.083Z",
                  "location": {
                    "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/step-definitions/sebas-e2e.steps.ts",
                    "line": 71,
                    "column": 60
                  }
                }
              ],
              "type": "Task",
              "startedAt": "2026-10-27T05:25:38.080Z",
              "location": {
                "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/sebas-e2e.feature",
                "line": 40
              }
            },
            {
              "name": "Entonces debe ver bajo el buscador el error \"El documento tiene 10 dígitos, sin letras, puntos ni espacios.\"",
              "outcome": "SUCCESS",
              "duration": 78,
              "children": [
                {
                  "name": "Tomás ensures that the text of error del buscador does eventually equal \"El documento tiene 10 dígitos, sin letras, puntos ni espacios.\"",
                  "outcome": "SUCCESS",
                  "duration": 15,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-27T05:25:38.536Z",
                  "location": {
                    "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/step-definitions/sebas-e2e.steps.ts",
                    "line": 82,
                    "column": 49
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-27T05-25-28.819Z/screenshot-win32-chromium-156-0-4314-42-tom-s-ensures-that-the-text-of-erro-664466bb5b.png",
                      "type": "screenshot"
                    }
                  ]
                }
              ],
              "type": "Task",
              "startedAt": "2026-10-27T05:25:38.534Z",
              "location": {
                "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/sebas-e2e.feature",
                "line": 41
              }
            },
            {
              "name": "After",
              "outcome": "SUCCESS",
              "duration": 2,
              "children": [],
              "type": "Task",
              "startedAt": "2026-10-27T05:25:38.613Z",
              "location": {
                "path": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/sebas/actors.ts",
                "line": 43
              }
            }
          ]
        }
      ],
      "narrative": "<p>Como estudiante o entrenador del gimnasio UdeM\nQuiero usar la interfaz web\nPara comprobar de punta a punta RF06, RF07, RF08, RF09 y RF10</p>\n",
      "cast": [
        {
          "name": "Preparador",
          "abilities": [
            {
              "name": "PerformActivities"
            },
            {
              "name": "AnswerQuestions"
            },
            {
              "name": "RaiseErrors"
            },
            {
              "name": "ScheduleWork",
              "details": "{\"scheduler\":{\"clock\":{\"timeAdjustment\":{\"milliseconds\":0}},\"interactionTimeout\":{\"milliseconds\":5000}}}"
            },
            {
              "name": "BrowseTheWebWithPlaywright"
            },
            {
              "name": "ConsultarLaBaseDeDatos"
            }
          ]
        },
        {
          "name": "Tomás",
          "abilities": [
            {
              "name": "PerformActivities"
            },
            {
              "name": "AnswerQuestions"
            },
            {
              "name": "RaiseErrors"
            },
            {
              "name": "ScheduleWork",
              "details": "{\"scheduler\":{\"clock\":{\"timeAdjustment\":{\"milliseconds\":0}},\"interactionTimeout\":{\"milliseconds\":5000}}}"
            },
            {
              "name": "BrowseTheWebWithPlaywright"
            },
            {
              "name": "ConsultarLaBaseDeDatos"
            }
          ]
        }
      ],
      "id": "C:/Users/sebas/OneDrive/Desktop/Sebas/reservas_gimnasio_udem/regression_testing/serenityjs/features/sebas-e2e.feature:38"
    }
  ],
  "history": [
    {
      "timestamp": "2026-10-27T05:21:21.207Z",
      "duration": 17231,
      "outcomes": {
        "passed": 28,
        "failed": 0,
        "pending": 0,
        "skipped": 0,
        "compromised": 0,
        "error": 0
      },
      "label": "2026-10-27T05-21-21.384Z",
      "slowest": 4515,
      "fastest": 168,
      "average": 613,
      "commit": "cf4d90b",
      "branch": "main",
      "repositoryUrl": "https://github.com/ocamilavillero09/reservas_gimnasio_udem.git",
      "score": {
        "confidence": 100,
        "passRate": 100,
        "consistency": 100,
        "completeness": 100
      }
    },
    {
      "timestamp": "2026-10-27T05:25:28.133Z",
      "duration": 10572,
      "outcomes": {
        "passed": 4,
        "failed": 0,
        "pending": 0,
        "skipped": 0,
        "compromised": 0,
        "error": 0
      },
      "label": "2026-10-27T05-25-28.819Z",
      "slowest": 3233,
      "fastest": 2125,
      "average": 2638,
      "commit": "cf4d90b",
      "branch": "main",
      "repositoryUrl": "https://github.com/ocamilavillero09/reservas_gimnasio_udem.git",
      "score": {
        "confidence": 100,
        "passRate": 100,
        "consistency": 100,
        "completeness": 100
      }
    }
  ],
  "tags": [
    {
      "type": "feature",
      "name": "E2E de navegador - reservas del estudiante y búsqueda del entrenador",
      "scenarioCount": 4,
      "passed": 4,
      "failed": 0,
      "skipped": 0
    },
    {
      "type": "tag",
      "name": "sebas-e2e",
      "scenarioCount": 4,
      "passed": 4,
      "failed": 0,
      "skipped": 0
    },
    {
      "type": "tag",
      "name": "rf06",
      "scenarioCount": 1,
      "passed": 1,
      "failed": 0,
      "skipped": 0
    },
    {
      "type": "tag",
      "name": "rf07",
      "scenarioCount": 1,
      "passed": 1,
      "failed": 0,
      "skipped": 0
    },
    {
      "type": "tag",
      "name": "rf08",
      "scenarioCount": 1,
      "passed": 1,
      "failed": 0,
      "skipped": 0
    },
    {
      "type": "tag",
      "name": "rf09",
      "scenarioCount": 1,
      "passed": 1,
      "failed": 0,
      "skipped": 0
    },
    {
      "type": "tag",
      "name": "rf10",
      "scenarioCount": 2,
      "passed": 2,
      "failed": 0,
      "skipped": 0
    }
  ],
  "inconsistentTests": [],
  "newFailures": [],
  "newPasses": [],
  "systemContext": {
    "nodeVersion": "v24.19.0",
    "os": {
      "name": "win32",
      "version": "10.0.26300",
      "arch": "x64"
    },
    "serenityVersion": "3.48.0",
    "testRunner": {
      "name": "Cucumber",
      "version": "13.3.0"
    },
    "browsers": [],
    "ci": {
      "provider": "localhost (Sebas)",
      "buildNumber": "2026-10-27 05:25",
      "branch": "main",
      "commit": "cf4d90b",
      "commitMessage": "ScreenPy de Sebas: login con token y evidencia 25/25",
      "commitAuthor": "Sebas",
      "repositoryUrl": "https://github.com/ocamilavillero09/reservas_gimnasio_udem.git"
    },
    "projectName": "serenityjs-e2e-screenplay",
    "packageManager": "npm"
  },
  "capabilities": {
    "type": "directory",
    "name": "features",
    "outcomes": {
      "passed": 4,
      "failed": 0,
      "pending": 0,
      "skipped": 0,
      "compromised": 0,
      "error": 0
    },
    "scenarioCount": 4,
    "children": [
      {
        "type": "file",
        "name": "sebas-e2e",
        "outcomes": {
          "passed": 4,
          "failed": 0,
          "pending": 0,
          "skipped": 0,
          "compromised": 0,
          "error": 0
        },
        "scenarioCount": 4,
        "scenarios": [
          {
            "name": "Reservar el bloque de las 06:00 desde el panel (RF07 exitoso)",
            "outcome": "SUCCESS",
            "executionHistory": [
              "SUCCESS",
              "SUCCESS"
            ]
          },
          {
            "name": "Consultar y cancelar la reserva activa desde Mis reservas (RF08 y RF09 exitoso)",
            "outcome": "SUCCESS",
            "executionHistory": [
              "SUCCESS",
              "SUCCESS"
            ]
          },
          {
            "name": "El entrenador encuentra la reserva activa de una estudiante (RF10 exitoso)",
            "outcome": "SUCCESS",
            "executionHistory": [
              "SUCCESS",
              "SUCCESS"
            ]
          },
          {
            "name": "El entrenador escribe un documento con formato inválido (RF10 error)",
            "outcome": "SUCCESS",
            "executionHistory": [
              "SUCCESS",
              "SUCCESS"
            ]
          }
        ],
        "narrative": "Como estudiante o entrenador del gimnasio UdeM\nQuiero usar la interfaz web\nPara comprobar de punta a punta RF06, RF07, RF08, RF09 y RF10",
        "score": {
          "confidence": 100,
          "passRate": 100,
          "completeness": 100,
          "consistency": 100
        }
      }
    ],
    "score": {
      "confidence": 100,
      "passRate": 100,
      "completeness": 100,
      "consistency": 100
    }
  },
  "specDirectory": "features"
};

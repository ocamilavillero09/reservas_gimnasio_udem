window.__SERENITY_REPORT_DATA__ = {
  "schemaVersion": 1,
  "summary": {
    "title": "serenityjs-e2e-screenplay",
    "totalScenarios": 13,
    "outcomes": {
      "passed": 13,
      "failed": 0,
      "pending": 0,
      "skipped": 0,
      "compromised": 0,
      "error": 0
    },
    "duration": 26365,
    "startedAt": "2026-10-26T04:36:24.312Z",
    "finishedAt": "2026-10-26T04:36:50.677Z",
    "testRunner": "Cucumber"
  },
  "scenarios": [
    {
      "name": "Registrar la asistencia de una estudiante con reserva de hoy (RF11)",
      "category": "E2E de navegador - asistencia, cierre de jornada, registro diario y buzón",
      "outcome": "SUCCESS",
      "duration": 2928,
      "startedAt": "2026-10-26T04:36:24.312Z",
      "source": {
        "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila-e2e.feature",
        "line": 11
      },
      "tags": [
        {
          "type": "feature",
          "name": "E2E de navegador - asistencia, cierre de jornada, registro diario y buzón"
        },
        {
          "type": "tag",
          "name": "camila"
        },
        {
          "type": "tag",
          "name": "rf11"
        },
        {
          "type": "tag",
          "name": "rf12"
        },
        {
          "type": "tag",
          "name": "rf16"
        }
      ],
      "activities": [
        {
          "name": "Before",
          "outcome": "SUCCESS",
          "duration": 568,
          "children": [
            {
              "name": "Preparador deja la base de datos sin usuarios, reservas ni mensajes",
              "outcome": "SUCCESS",
              "duration": 28,
              "children": [],
              "type": "Interaction",
              "startedAt": "2026-10-26T04:36:24.498Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/actors.ts",
                "line": 47,
                "column": 25
              },
              "artifacts": [
                {
                  "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-preparador-deja-la-base-de-datos-s-40ad070d69.png",
                  "type": "screenshot"
                }
              ]
            },
            {
              "name": "Preparador registra la cuenta ana.admin@udemedellin.edu.co",
              "outcome": "SUCCESS",
              "duration": 34,
              "children": [],
              "type": "Interaction",
              "startedAt": "2026-10-26T04:36:24.673Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/actors.ts",
                "line": 48,
                "column": 60
              },
              "artifacts": [
                {
                  "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-preparador-registra-la-cuenta-ana--40ad070d69.png",
                  "type": "screenshot"
                }
              ]
            },
            {
              "name": "Preparador registra la cuenta tomas.coach@udem.edu.co",
              "outcome": "SUCCESS",
              "duration": 25,
              "children": [],
              "type": "Interaction",
              "startedAt": "2026-10-26T04:36:24.730Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/actors.ts",
                "line": 48,
                "column": 60
              },
              "artifacts": [
                {
                  "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-preparador-registra-la-cuenta-toma-40ad070d69.png",
                  "type": "screenshot"
                }
              ]
            },
            {
              "name": "Preparador registra la cuenta laura.est@soyudemedellin.edu.co",
              "outcome": "SUCCESS",
              "duration": 23,
              "children": [],
              "type": "Interaction",
              "startedAt": "2026-10-26T04:36:24.778Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/actors.ts",
                "line": 48,
                "column": 60
              },
              "artifacts": [
                {
                  "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-preparador-registra-la-cuenta-laur-40ad070d69.png",
                  "type": "screenshot"
                }
              ]
            },
            {
              "name": "Preparador registra la cuenta mateo.est@soyudemedellin.edu.co",
              "outcome": "SUCCESS",
              "duration": 22,
              "children": [],
              "type": "Interaction",
              "startedAt": "2026-10-26T04:36:24.823Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/actors.ts",
                "line": 48,
                "column": 60
              },
              "artifacts": [
                {
                  "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-preparador-registra-la-cuenta-mate-40ad070d69.png",
                  "type": "screenshot"
                }
              ]
            }
          ],
          "type": "Task",
          "startedAt": "2026-10-26T04:36:24.314Z",
          "location": {
            "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/actors.ts",
            "line": 33
          }
        },
        {
          "name": "Dado que Laura tiene una reserva de hoy a las 06:00",
          "outcome": "SUCCESS",
          "duration": 43,
          "children": [
            {
              "name": "Preparador siembra una reserva de hoy a las 06:00 para laura.est@soyudemedellin.edu.co",
              "outcome": "SUCCESS",
              "duration": 8,
              "children": [],
              "type": "Interaction",
              "startedAt": "2026-10-26T04:36:24.884Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/step-definitions/camila-e2e.steps.ts",
                "line": 19,
                "column": 66
              },
              "artifacts": [
                {
                  "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-preparador-siembra-una-reserva-de--40ad070d69.png",
                  "type": "screenshot"
                }
              ]
            }
          ],
          "type": "Task",
          "startedAt": "2026-10-26T04:36:24.882Z",
          "location": {
            "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila-e2e.feature",
            "line": 12
          }
        },
        {
          "name": "Y que Tomás inició sesión en el panel del gimnasio",
          "outcome": "SUCCESS",
          "duration": 1048,
          "children": [
            {
              "name": "Tomás inicia sesión como tomas.coach@udem.edu.co",
              "outcome": "SUCCESS",
              "duration": 775,
              "children": [
                {
                  "name": "Tomás navigates to \"http://localhost:5174\"",
                  "outcome": "SUCCESS",
                  "duration": 95,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:24.935Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/step-definitions/camila-e2e.steps.ts",
                    "line": 31,
                    "column": 54
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-tom-s-navigates-to--http---localho-b89d6247f2.png",
                      "type": "screenshot"
                    }
                  ]
                },
                {
                  "name": "Tomás enters \"tomas.coach@udem.edu.co\" into campo correo",
                  "outcome": "SUCCESS",
                  "duration": 25,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:25.117Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/tasks.ts",
                    "line": 15,
                    "column": 36
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-tom-s-enters--tomas-coach-udem-edu-b22e2290f1.png",
                      "type": "screenshot"
                    }
                  ]
                },
                {
                  "name": "Tomás enters \"1000000002\" into campo documento (contraseña)",
                  "outcome": "SUCCESS",
                  "duration": 50,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:25.198Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/tasks.ts",
                    "line": 16,
                    "column": 40
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-tom-s-enters--1000000002--into-cam-85308c8251.png",
                      "type": "screenshot"
                    }
                  ]
                },
                {
                  "name": "Tomás clicks on botón ingresar",
                  "outcome": "SUCCESS",
                  "duration": 368,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:25.296Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/tasks.ts",
                    "line": 17,
                    "column": 13
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-tom-s-clicks-on-bot-n-ingresar-6a403a8e5e.png",
                      "type": "screenshot"
                    }
                  ]
                }
              ],
              "type": "Task",
              "startedAt": "2026-10-26T04:36:24.935Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/step-definitions/camila-e2e.steps.ts",
                "line": 31,
                "column": 54
              }
            },
            {
              "name": "Tomás abre el panel del gimnasio",
              "outcome": "SUCCESS",
              "duration": 239,
              "children": [
                {
                  "name": "Tomás waits until botón Panel does become visible",
                  "outcome": "SUCCESS",
                  "duration": 26,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:25.722Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/tasks.ts",
                    "line": 22,
                    "column": 51
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-tom-s-waits-until-bot-n-panel-does-2d6808cf9a.png",
                      "type": "screenshot"
                    }
                  ]
                },
                {
                  "name": "Tomás clicks on botón Panel",
                  "outcome": "SUCCESS",
                  "duration": 70,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:25.785Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/tasks.ts",
                    "line": 22,
                    "column": 79
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-tom-s-clicks-on-bot-n-panel-251ac46ea1.png",
                      "type": "screenshot"
                    }
                  ]
                },
                {
                  "name": "Tomás waits until título del panel does become visible",
                  "outcome": "SUCCESS",
                  "duration": 27,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:25.901Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/tasks.ts",
                    "line": 22,
                    "column": 96
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-tom-s-waits-until-t-tulo-del-panel-6a25952082.png",
                      "type": "screenshot"
                    }
                  ]
                }
              ],
              "type": "Task",
              "startedAt": "2026-10-26T04:36:25.722Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/step-definitions/camila-e2e.steps.ts",
                "line": 31,
                "column": 90
              }
            }
          ],
          "type": "Task",
          "startedAt": "2026-10-26T04:36:24.926Z",
          "location": {
            "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila-e2e.feature",
            "line": 13
          }
        },
        {
          "name": "Cuando registra la asistencia del estudiante con documento \"1000000003\"",
          "outcome": "SUCCESS",
          "duration": 437,
          "children": [
            {
              "name": "Tomás registra la asistencia del estudiante con documento 1000000003",
              "outcome": "SUCCESS",
              "duration": 423,
              "children": [
                {
                  "name": "Tomás busca al estudiante con documento 1000000003",
                  "outcome": "SUCCESS",
                  "duration": 239,
                  "children": [
                    {
                      "name": "Tomás enters \"1000000003\" into campo documento del estudiante",
                      "outcome": "SUCCESS",
                      "duration": 4,
                      "children": [],
                      "type": "Interaction",
                      "startedAt": "2026-10-26T04:36:25.978Z",
                      "location": {
                        "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/tasks.ts",
                        "line": 29,
                        "column": 33
                      },
                      "artifacts": [
                        {
                          "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-tom-s-enters--1000000003--into-cam-6c98d29cfc.png",
                          "type": "screenshot"
                        }
                      ]
                    },
                    {
                      "name": "Tomás clicks on botón Buscar",
                      "outcome": "SUCCESS",
                      "duration": 152,
                      "children": [],
                      "type": "Interaction",
                      "startedAt": "2026-10-26T04:36:26.018Z",
                      "location": {
                        "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/tasks.ts",
                        "line": 30,
                        "column": 13
                      },
                      "artifacts": [
                        {
                          "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-tom-s-clicks-on-bot-n-buscar-d3a3bba2ce.png",
                          "type": "screenshot"
                        }
                      ]
                    }
                  ],
                  "type": "Task",
                  "startedAt": "2026-10-26T04:36:25.978Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/tasks.ts",
                    "line": 38,
                    "column": 24
                  }
                },
                {
                  "name": "Tomás waits until botón Registrar asistencia does become visible",
                  "outcome": "SUCCESS",
                  "duration": 19,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:26.228Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/tasks.ts",
                    "line": 39,
                    "column": 7
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-tom-s-waits-until-bot-n-registrar--21c4d3fdaf.png",
                      "type": "screenshot"
                    }
                  ]
                },
                {
                  "name": "Tomás clicks on botón Registrar asistencia",
                  "outcome": "SUCCESS",
                  "duration": 71,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:26.284Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/tasks.ts",
                    "line": 40,
                    "column": 13
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-tom-s-clicks-on-bot-n-registrar-as-b068b8b0a6.png",
                      "type": "screenshot"
                    }
                  ]
                }
              ],
              "type": "Task",
              "startedAt": "2026-10-26T04:36:25.978Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/step-definitions/camila-e2e.steps.ts",
                "line": 40,
                "column": 62
              }
            }
          ],
          "type": "Task",
          "startedAt": "2026-10-26T04:36:25.974Z",
          "location": {
            "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila-e2e.feature",
            "line": 14
          }
        },
        {
          "name": "Entonces debe aparecer el aviso \"Asistencia registrada para las 06:00\"",
          "outcome": "SUCCESS",
          "duration": 643,
          "children": [
            {
              "name": "Tomás waits until mensaje del aviso does become visible",
              "outcome": "SUCCESS",
              "duration": 533,
              "children": [],
              "type": "Interaction",
              "startedAt": "2026-10-26T04:36:26.416Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/step-definitions/camila-e2e.steps.ts",
                "line": 169,
                "column": 42
              },
              "artifacts": [
                {
                  "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-tom-s-waits-until-mensaje-del-avis-b684923240.png",
                  "type": "screenshot"
                }
              ]
            },
            {
              "name": "Tomás ensures that the text of mensaje del aviso does eventually include \"Asistencia registrada para las 06:00\"",
              "outcome": "SUCCESS",
              "duration": 15,
              "children": [],
              "type": "Interaction",
              "startedAt": "2026-10-26T04:36:27.006Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/step-definitions/camila-e2e.steps.ts",
                "line": 169,
                "column": 66
              },
              "artifacts": [
                {
                  "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-tom-s-ensures-that-the-text-of-men-b684923240.png",
                  "type": "screenshot"
                }
              ]
            }
          ],
          "type": "Task",
          "startedAt": "2026-10-26T04:36:26.412Z",
          "location": {
            "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila-e2e.feature",
            "line": 15
          }
        },
        {
          "name": "Y la reserva de Laura debe quedar \"COMPLETADA\"",
          "outcome": "SUCCESS",
          "duration": 55,
          "children": [
            {
              "name": "Tomás ensures that el estado de la reserva de hoy de laura.est@soyudemedellin.edu.co does eventually equal \"COMPLETADA\"",
              "outcome": "SUCCESS",
              "duration": 19,
              "children": [],
              "type": "Interaction",
              "startedAt": "2026-10-26T04:36:27.057Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/step-definitions/camila-e2e.steps.ts",
                "line": 59,
                "column": 49
              },
              "artifacts": [
                {
                  "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-tom-s-ensures-that-el-estado-de-la-b684923240.png",
                  "type": "screenshot"
                }
              ]
            }
          ],
          "type": "Task",
          "startedAt": "2026-10-26T04:36:27.056Z",
          "location": {
            "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila-e2e.feature",
            "line": 16
          }
        },
        {
          "name": "Y no debe quedar ninguna reserva sin asistencia",
          "outcome": "SUCCESS",
          "duration": 50,
          "children": [
            {
              "name": "Tomás ensures that aviso de jornada sin pendientes does eventually become visible",
              "outcome": "SUCCESS",
              "duration": 18,
              "children": [],
              "type": "Interaction",
              "startedAt": "2026-10-26T04:36:27.112Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/step-definitions/camila-e2e.steps.ts",
                "line": 68,
                "column": 49
              },
              "artifacts": [
                {
                  "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-tom-s-ensures-that-aviso-de-jornad-b684923240.png",
                  "type": "screenshot"
                }
              ]
            }
          ],
          "type": "Task",
          "startedAt": "2026-10-26T04:36:27.111Z",
          "location": {
            "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila-e2e.feature",
            "line": 17
          }
        },
        {
          "name": "Y el registro diario debe mostrar 1 asistencias",
          "outcome": "SUCCESS",
          "duration": 49,
          "children": [
            {
              "name": "Tomás ensures that the text of total de asistencias does eventually equal \"1\"",
              "outcome": "SUCCESS",
              "duration": 12,
              "children": [],
              "type": "Interaction",
              "startedAt": "2026-10-26T04:36:27.162Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/step-definitions/camila-e2e.steps.ts",
                "line": 110,
                "column": 49
              },
              "artifacts": [
                {
                  "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-tom-s-ensures-that-the-text-of-tot-b684923240.png",
                  "type": "screenshot"
                }
              ]
            }
          ],
          "type": "Task",
          "startedAt": "2026-10-26T04:36:27.161Z",
          "location": {
            "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila-e2e.feature",
            "line": 18
          }
        },
        {
          "name": "After",
          "outcome": "SUCCESS",
          "duration": 6,
          "children": [],
          "type": "Task",
          "startedAt": "2026-10-26T04:36:27.210Z",
          "location": {
            "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/actors.ts",
            "line": 52
          }
        }
      ],
      "executionHistory": [
        {
          "outcome": "SUCCESS",
          "run": "2026-10-26T04-36-24.665Z",
          "timestamp": "2026-10-26T04:36:24.312Z",
          "duration": 2928,
          "activities": [
            {
              "name": "Before",
              "outcome": "SUCCESS",
              "duration": 568,
              "children": [
                {
                  "name": "Preparador deja la base de datos sin usuarios, reservas ni mensajes",
                  "outcome": "SUCCESS",
                  "duration": 28,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:24.498Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/actors.ts",
                    "line": 47,
                    "column": 25
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-preparador-deja-la-base-de-datos-s-40ad070d69.png",
                      "type": "screenshot"
                    }
                  ]
                },
                {
                  "name": "Preparador registra la cuenta ana.admin@udemedellin.edu.co",
                  "outcome": "SUCCESS",
                  "duration": 34,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:24.673Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/actors.ts",
                    "line": 48,
                    "column": 60
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-preparador-registra-la-cuenta-ana--40ad070d69.png",
                      "type": "screenshot"
                    }
                  ]
                },
                {
                  "name": "Preparador registra la cuenta tomas.coach@udem.edu.co",
                  "outcome": "SUCCESS",
                  "duration": 25,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:24.730Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/actors.ts",
                    "line": 48,
                    "column": 60
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-preparador-registra-la-cuenta-toma-40ad070d69.png",
                      "type": "screenshot"
                    }
                  ]
                },
                {
                  "name": "Preparador registra la cuenta laura.est@soyudemedellin.edu.co",
                  "outcome": "SUCCESS",
                  "duration": 23,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:24.778Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/actors.ts",
                    "line": 48,
                    "column": 60
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-preparador-registra-la-cuenta-laur-40ad070d69.png",
                      "type": "screenshot"
                    }
                  ]
                },
                {
                  "name": "Preparador registra la cuenta mateo.est@soyudemedellin.edu.co",
                  "outcome": "SUCCESS",
                  "duration": 22,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:24.823Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/actors.ts",
                    "line": 48,
                    "column": 60
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-preparador-registra-la-cuenta-mate-40ad070d69.png",
                      "type": "screenshot"
                    }
                  ]
                }
              ],
              "type": "Task",
              "startedAt": "2026-10-26T04:36:24.314Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/actors.ts",
                "line": 33
              }
            },
            {
              "name": "Dado que Laura tiene una reserva de hoy a las 06:00",
              "outcome": "SUCCESS",
              "duration": 43,
              "children": [
                {
                  "name": "Preparador siembra una reserva de hoy a las 06:00 para laura.est@soyudemedellin.edu.co",
                  "outcome": "SUCCESS",
                  "duration": 8,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:24.884Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/step-definitions/camila-e2e.steps.ts",
                    "line": 19,
                    "column": 66
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-preparador-siembra-una-reserva-de--40ad070d69.png",
                      "type": "screenshot"
                    }
                  ]
                }
              ],
              "type": "Task",
              "startedAt": "2026-10-26T04:36:24.882Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila-e2e.feature",
                "line": 12
              }
            },
            {
              "name": "Y que Tomás inició sesión en el panel del gimnasio",
              "outcome": "SUCCESS",
              "duration": 1048,
              "children": [
                {
                  "name": "Tomás inicia sesión como tomas.coach@udem.edu.co",
                  "outcome": "SUCCESS",
                  "duration": 775,
                  "children": [
                    {
                      "name": "Tomás navigates to \"http://localhost:5174\"",
                      "outcome": "SUCCESS",
                      "duration": 95,
                      "children": [],
                      "type": "Interaction",
                      "startedAt": "2026-10-26T04:36:24.935Z",
                      "location": {
                        "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/step-definitions/camila-e2e.steps.ts",
                        "line": 31,
                        "column": 54
                      },
                      "artifacts": [
                        {
                          "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-tom-s-navigates-to--http---localho-b89d6247f2.png",
                          "type": "screenshot"
                        }
                      ]
                    },
                    {
                      "name": "Tomás enters \"tomas.coach@udem.edu.co\" into campo correo",
                      "outcome": "SUCCESS",
                      "duration": 25,
                      "children": [],
                      "type": "Interaction",
                      "startedAt": "2026-10-26T04:36:25.117Z",
                      "location": {
                        "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/tasks.ts",
                        "line": 15,
                        "column": 36
                      },
                      "artifacts": [
                        {
                          "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-tom-s-enters--tomas-coach-udem-edu-b22e2290f1.png",
                          "type": "screenshot"
                        }
                      ]
                    },
                    {
                      "name": "Tomás enters \"1000000002\" into campo documento (contraseña)",
                      "outcome": "SUCCESS",
                      "duration": 50,
                      "children": [],
                      "type": "Interaction",
                      "startedAt": "2026-10-26T04:36:25.198Z",
                      "location": {
                        "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/tasks.ts",
                        "line": 16,
                        "column": 40
                      },
                      "artifacts": [
                        {
                          "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-tom-s-enters--1000000002--into-cam-85308c8251.png",
                          "type": "screenshot"
                        }
                      ]
                    },
                    {
                      "name": "Tomás clicks on botón ingresar",
                      "outcome": "SUCCESS",
                      "duration": 368,
                      "children": [],
                      "type": "Interaction",
                      "startedAt": "2026-10-26T04:36:25.296Z",
                      "location": {
                        "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/tasks.ts",
                        "line": 17,
                        "column": 13
                      },
                      "artifacts": [
                        {
                          "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-tom-s-clicks-on-bot-n-ingresar-6a403a8e5e.png",
                          "type": "screenshot"
                        }
                      ]
                    }
                  ],
                  "type": "Task",
                  "startedAt": "2026-10-26T04:36:24.935Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/step-definitions/camila-e2e.steps.ts",
                    "line": 31,
                    "column": 54
                  }
                },
                {
                  "name": "Tomás abre el panel del gimnasio",
                  "outcome": "SUCCESS",
                  "duration": 239,
                  "children": [
                    {
                      "name": "Tomás waits until botón Panel does become visible",
                      "outcome": "SUCCESS",
                      "duration": 26,
                      "children": [],
                      "type": "Interaction",
                      "startedAt": "2026-10-26T04:36:25.722Z",
                      "location": {
                        "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/tasks.ts",
                        "line": 22,
                        "column": 51
                      },
                      "artifacts": [
                        {
                          "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-tom-s-waits-until-bot-n-panel-does-2d6808cf9a.png",
                          "type": "screenshot"
                        }
                      ]
                    },
                    {
                      "name": "Tomás clicks on botón Panel",
                      "outcome": "SUCCESS",
                      "duration": 70,
                      "children": [],
                      "type": "Interaction",
                      "startedAt": "2026-10-26T04:36:25.785Z",
                      "location": {
                        "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/tasks.ts",
                        "line": 22,
                        "column": 79
                      },
                      "artifacts": [
                        {
                          "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-tom-s-clicks-on-bot-n-panel-251ac46ea1.png",
                          "type": "screenshot"
                        }
                      ]
                    },
                    {
                      "name": "Tomás waits until título del panel does become visible",
                      "outcome": "SUCCESS",
                      "duration": 27,
                      "children": [],
                      "type": "Interaction",
                      "startedAt": "2026-10-26T04:36:25.901Z",
                      "location": {
                        "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/tasks.ts",
                        "line": 22,
                        "column": 96
                      },
                      "artifacts": [
                        {
                          "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-tom-s-waits-until-t-tulo-del-panel-6a25952082.png",
                          "type": "screenshot"
                        }
                      ]
                    }
                  ],
                  "type": "Task",
                  "startedAt": "2026-10-26T04:36:25.722Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/step-definitions/camila-e2e.steps.ts",
                    "line": 31,
                    "column": 90
                  }
                }
              ],
              "type": "Task",
              "startedAt": "2026-10-26T04:36:24.926Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila-e2e.feature",
                "line": 13
              }
            },
            {
              "name": "Cuando registra la asistencia del estudiante con documento \"1000000003\"",
              "outcome": "SUCCESS",
              "duration": 437,
              "children": [
                {
                  "name": "Tomás registra la asistencia del estudiante con documento 1000000003",
                  "outcome": "SUCCESS",
                  "duration": 423,
                  "children": [
                    {
                      "name": "Tomás busca al estudiante con documento 1000000003",
                      "outcome": "SUCCESS",
                      "duration": 239,
                      "children": [
                        {
                          "name": "Tomás enters \"1000000003\" into campo documento del estudiante",
                          "outcome": "SUCCESS",
                          "duration": 4,
                          "children": [],
                          "type": "Interaction",
                          "startedAt": "2026-10-26T04:36:25.978Z",
                          "location": {
                            "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/tasks.ts",
                            "line": 29,
                            "column": 33
                          },
                          "artifacts": [
                            {
                              "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-tom-s-enters--1000000003--into-cam-6c98d29cfc.png",
                              "type": "screenshot"
                            }
                          ]
                        },
                        {
                          "name": "Tomás clicks on botón Buscar",
                          "outcome": "SUCCESS",
                          "duration": 152,
                          "children": [],
                          "type": "Interaction",
                          "startedAt": "2026-10-26T04:36:26.018Z",
                          "location": {
                            "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/tasks.ts",
                            "line": 30,
                            "column": 13
                          },
                          "artifacts": [
                            {
                              "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-tom-s-clicks-on-bot-n-buscar-d3a3bba2ce.png",
                              "type": "screenshot"
                            }
                          ]
                        }
                      ],
                      "type": "Task",
                      "startedAt": "2026-10-26T04:36:25.978Z",
                      "location": {
                        "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/tasks.ts",
                        "line": 38,
                        "column": 24
                      }
                    },
                    {
                      "name": "Tomás waits until botón Registrar asistencia does become visible",
                      "outcome": "SUCCESS",
                      "duration": 19,
                      "children": [],
                      "type": "Interaction",
                      "startedAt": "2026-10-26T04:36:26.228Z",
                      "location": {
                        "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/tasks.ts",
                        "line": 39,
                        "column": 7
                      },
                      "artifacts": [
                        {
                          "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-tom-s-waits-until-bot-n-registrar--21c4d3fdaf.png",
                          "type": "screenshot"
                        }
                      ]
                    },
                    {
                      "name": "Tomás clicks on botón Registrar asistencia",
                      "outcome": "SUCCESS",
                      "duration": 71,
                      "children": [],
                      "type": "Interaction",
                      "startedAt": "2026-10-26T04:36:26.284Z",
                      "location": {
                        "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/tasks.ts",
                        "line": 40,
                        "column": 13
                      },
                      "artifacts": [
                        {
                          "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-tom-s-clicks-on-bot-n-registrar-as-b068b8b0a6.png",
                          "type": "screenshot"
                        }
                      ]
                    }
                  ],
                  "type": "Task",
                  "startedAt": "2026-10-26T04:36:25.978Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/step-definitions/camila-e2e.steps.ts",
                    "line": 40,
                    "column": 62
                  }
                }
              ],
              "type": "Task",
              "startedAt": "2026-10-26T04:36:25.974Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila-e2e.feature",
                "line": 14
              }
            },
            {
              "name": "Entonces debe aparecer el aviso \"Asistencia registrada para las 06:00\"",
              "outcome": "SUCCESS",
              "duration": 643,
              "children": [
                {
                  "name": "Tomás waits until mensaje del aviso does become visible",
                  "outcome": "SUCCESS",
                  "duration": 533,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:26.416Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/step-definitions/camila-e2e.steps.ts",
                    "line": 169,
                    "column": 42
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-tom-s-waits-until-mensaje-del-avis-b684923240.png",
                      "type": "screenshot"
                    }
                  ]
                },
                {
                  "name": "Tomás ensures that the text of mensaje del aviso does eventually include \"Asistencia registrada para las 06:00\"",
                  "outcome": "SUCCESS",
                  "duration": 15,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:27.006Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/step-definitions/camila-e2e.steps.ts",
                    "line": 169,
                    "column": 66
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-tom-s-ensures-that-the-text-of-men-b684923240.png",
                      "type": "screenshot"
                    }
                  ]
                }
              ],
              "type": "Task",
              "startedAt": "2026-10-26T04:36:26.412Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila-e2e.feature",
                "line": 15
              }
            },
            {
              "name": "Y la reserva de Laura debe quedar \"COMPLETADA\"",
              "outcome": "SUCCESS",
              "duration": 55,
              "children": [
                {
                  "name": "Tomás ensures that el estado de la reserva de hoy de laura.est@soyudemedellin.edu.co does eventually equal \"COMPLETADA\"",
                  "outcome": "SUCCESS",
                  "duration": 19,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:27.057Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/step-definitions/camila-e2e.steps.ts",
                    "line": 59,
                    "column": 49
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-tom-s-ensures-that-el-estado-de-la-b684923240.png",
                      "type": "screenshot"
                    }
                  ]
                }
              ],
              "type": "Task",
              "startedAt": "2026-10-26T04:36:27.056Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila-e2e.feature",
                "line": 16
              }
            },
            {
              "name": "Y no debe quedar ninguna reserva sin asistencia",
              "outcome": "SUCCESS",
              "duration": 50,
              "children": [
                {
                  "name": "Tomás ensures that aviso de jornada sin pendientes does eventually become visible",
                  "outcome": "SUCCESS",
                  "duration": 18,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:27.112Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/step-definitions/camila-e2e.steps.ts",
                    "line": 68,
                    "column": 49
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-tom-s-ensures-that-aviso-de-jornad-b684923240.png",
                      "type": "screenshot"
                    }
                  ]
                }
              ],
              "type": "Task",
              "startedAt": "2026-10-26T04:36:27.111Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila-e2e.feature",
                "line": 17
              }
            },
            {
              "name": "Y el registro diario debe mostrar 1 asistencias",
              "outcome": "SUCCESS",
              "duration": 49,
              "children": [
                {
                  "name": "Tomás ensures that the text of total de asistencias does eventually equal \"1\"",
                  "outcome": "SUCCESS",
                  "duration": 12,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:27.162Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/step-definitions/camila-e2e.steps.ts",
                    "line": 110,
                    "column": 49
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-tom-s-ensures-that-the-text-of-tot-b684923240.png",
                      "type": "screenshot"
                    }
                  ]
                }
              ],
              "type": "Task",
              "startedAt": "2026-10-26T04:36:27.161Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila-e2e.feature",
                "line": 18
              }
            },
            {
              "name": "After",
              "outcome": "SUCCESS",
              "duration": 6,
              "children": [],
              "type": "Task",
              "startedAt": "2026-10-26T04:36:27.210Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/actors.ts",
                "line": 52
              }
            }
          ]
        }
      ],
      "narrative": "<p>Como entrenador, administradora o estudiante del gimnasio UdeM\nQuiero usar la interfaz web\nPara comprobar los requisitos RF11, RF12, RF13, RF16, RF20 y RF21</p>\n",
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
      "id": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila-e2e.feature:11"
    },
    {
      "name": "Buscar un documento que no está registrado (RF11 error)",
      "category": "E2E de navegador - asistencia, cierre de jornada, registro diario y buzón",
      "outcome": "SUCCESS",
      "duration": 2150,
      "startedAt": "2026-10-26T04:36:27.244Z",
      "source": {
        "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila-e2e.feature",
        "line": 21
      },
      "tags": [
        {
          "type": "feature",
          "name": "E2E de navegador - asistencia, cierre de jornada, registro diario y buzón"
        },
        {
          "type": "tag",
          "name": "camila"
        },
        {
          "type": "tag",
          "name": "rf11"
        }
      ],
      "activities": [
        {
          "name": "Before",
          "outcome": "SUCCESS",
          "duration": 285,
          "children": [
            {
              "name": "Preparador deja la base de datos sin usuarios, reservas ni mensajes",
              "outcome": "SUCCESS",
              "duration": 8,
              "children": [],
              "type": "Interaction",
              "startedAt": "2026-10-26T04:36:27.248Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/actors.ts",
                "line": 47,
                "column": 25
              },
              "artifacts": [
                {
                  "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-preparador-deja-la-base-de-datos-s-40ad070d69.png",
                  "type": "screenshot"
                }
              ]
            },
            {
              "name": "Preparador registra la cuenta ana.admin@udemedellin.edu.co",
              "outcome": "SUCCESS",
              "duration": 23,
              "children": [],
              "type": "Interaction",
              "startedAt": "2026-10-26T04:36:27.323Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/actors.ts",
                "line": 48,
                "column": 60
              },
              "artifacts": [
                {
                  "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-preparador-registra-la-cuenta-ana--40ad070d69.png",
                  "type": "screenshot"
                }
              ]
            },
            {
              "name": "Preparador registra la cuenta tomas.coach@udem.edu.co",
              "outcome": "SUCCESS",
              "duration": 22,
              "children": [],
              "type": "Interaction",
              "startedAt": "2026-10-26T04:36:27.382Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/actors.ts",
                "line": 48,
                "column": 60
              },
              "artifacts": [
                {
                  "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-preparador-registra-la-cuenta-toma-40ad070d69.png",
                  "type": "screenshot"
                }
              ]
            },
            {
              "name": "Preparador registra la cuenta laura.est@soyudemedellin.edu.co",
              "outcome": "SUCCESS",
              "duration": 24,
              "children": [],
              "type": "Interaction",
              "startedAt": "2026-10-26T04:36:27.426Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/actors.ts",
                "line": 48,
                "column": 60
              },
              "artifacts": [
                {
                  "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-preparador-registra-la-cuenta-laur-40ad070d69.png",
                  "type": "screenshot"
                }
              ]
            },
            {
              "name": "Preparador registra la cuenta mateo.est@soyudemedellin.edu.co",
              "outcome": "SUCCESS",
              "duration": 21,
              "children": [],
              "type": "Interaction",
              "startedAt": "2026-10-26T04:36:27.472Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/actors.ts",
                "line": 48,
                "column": 60
              },
              "artifacts": [
                {
                  "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-preparador-registra-la-cuenta-mate-40ad070d69.png",
                  "type": "screenshot"
                }
              ]
            }
          ],
          "type": "Task",
          "startedAt": "2026-10-26T04:36:27.245Z",
          "location": {
            "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/actors.ts",
            "line": 33
          }
        },
        {
          "name": "Dado que Tomás inició sesión en el panel del gimnasio",
          "outcome": "SUCCESS",
          "duration": 968,
          "children": [
            {
              "name": "Tomás inicia sesión como tomas.coach@udem.edu.co",
              "outcome": "SUCCESS",
              "duration": 708,
              "children": [
                {
                  "name": "Tomás navigates to \"http://localhost:5174\"",
                  "outcome": "SUCCESS",
                  "duration": 75,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:27.537Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/step-definitions/camila-e2e.steps.ts",
                    "line": 31,
                    "column": 54
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-tom-s-navigates-to--http---localho-676377ade5.png",
                      "type": "screenshot"
                    }
                  ]
                },
                {
                  "name": "Tomás enters \"tomas.coach@udem.edu.co\" into campo correo",
                  "outcome": "SUCCESS",
                  "duration": 10,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:27.667Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/tasks.ts",
                    "line": 15,
                    "column": 36
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-tom-s-enters--tomas-coach-udem-edu-5a74c6644d.png",
                      "type": "screenshot"
                    }
                  ]
                },
                {
                  "name": "Tomás enters \"1000000002\" into campo documento (contraseña)",
                  "outcome": "SUCCESS",
                  "duration": 58,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:27.737Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/tasks.ts",
                    "line": 16,
                    "column": 40
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-tom-s-enters--1000000002--into-cam-99ed8eeb44.png",
                      "type": "screenshot"
                    }
                  ]
                },
                {
                  "name": "Tomás clicks on botón ingresar",
                  "outcome": "SUCCESS",
                  "duration": 366,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:27.855Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/tasks.ts",
                    "line": 17,
                    "column": 13
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-tom-s-clicks-on-bot-n-ingresar-6a403a8e5e.png",
                      "type": "screenshot"
                    }
                  ]
                }
              ],
              "type": "Task",
              "startedAt": "2026-10-26T04:36:27.536Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/step-definitions/camila-e2e.steps.ts",
                "line": 31,
                "column": 54
              }
            },
            {
              "name": "Tomás abre el panel del gimnasio",
              "outcome": "SUCCESS",
              "duration": 231,
              "children": [
                {
                  "name": "Tomás waits until botón Panel does become visible",
                  "outcome": "SUCCESS",
                  "duration": 20,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:28.255Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/tasks.ts",
                    "line": 22,
                    "column": 51
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-tom-s-waits-until-bot-n-panel-does-2508a1eb8e.png",
                      "type": "screenshot"
                    }
                  ]
                },
                {
                  "name": "Tomás clicks on botón Panel",
                  "outcome": "SUCCESS",
                  "duration": 58,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:28.321Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/tasks.ts",
                    "line": 22,
                    "column": 79
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-tom-s-clicks-on-bot-n-panel-5cd4112364.png",
                      "type": "screenshot"
                    }
                  ]
                },
                {
                  "name": "Tomás waits until título del panel does become visible",
                  "outcome": "SUCCESS",
                  "duration": 19,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:28.423Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/tasks.ts",
                    "line": 22,
                    "column": 96
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-tom-s-waits-until-t-tulo-del-panel-accdc9bda5.png",
                      "type": "screenshot"
                    }
                  ]
                }
              ],
              "type": "Task",
              "startedAt": "2026-10-26T04:36:28.255Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/step-definitions/camila-e2e.steps.ts",
                "line": 31,
                "column": 90
              }
            }
          ],
          "type": "Task",
          "startedAt": "2026-10-26T04:36:27.530Z",
          "location": {
            "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila-e2e.feature",
            "line": 22
          }
        },
        {
          "name": "Cuando busca en el panel al estudiante con documento \"9999999999\"",
          "outcome": "SUCCESS",
          "duration": 257,
          "children": [
            {
              "name": "Tomás busca al estudiante con documento 9999999999",
              "outcome": "SUCCESS",
              "duration": 242,
              "children": [
                {
                  "name": "Tomás enters \"9999999999\" into campo documento del estudiante",
                  "outcome": "SUCCESS",
                  "duration": 3,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:28.501Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/tasks.ts",
                    "line": 29,
                    "column": 33
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-tom-s-enters--9999999999--into-cam-0ecb4667e6.png",
                      "type": "screenshot"
                    }
                  ]
                },
                {
                  "name": "Tomás clicks on botón Buscar",
                  "outcome": "SUCCESS",
                  "duration": 159,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:28.538Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/tasks.ts",
                    "line": 30,
                    "column": 13
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-tom-s-clicks-on-bot-n-buscar-41d3f75c5d.png",
                      "type": "screenshot"
                    }
                  ]
                }
              ],
              "type": "Task",
              "startedAt": "2026-10-26T04:36:28.501Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/step-definitions/camila-e2e.steps.ts",
                "line": 44,
                "column": 59
              }
            }
          ],
          "type": "Task",
          "startedAt": "2026-10-26T04:36:28.498Z",
          "location": {
            "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila-e2e.feature",
            "line": 23
          }
        },
        {
          "name": "Entonces debe aparecer el aviso \"No hay ningún estudiante registrado con el documento 9999999999\"",
          "outcome": "SUCCESS",
          "duration": 614,
          "children": [
            {
              "name": "Tomás waits until mensaje del aviso does become visible",
              "outcome": "SUCCESS",
              "duration": 529,
              "children": [],
              "type": "Interaction",
              "startedAt": "2026-10-26T04:36:28.758Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/step-definitions/camila-e2e.steps.ts",
                "line": 169,
                "column": 42
              },
              "artifacts": [
                {
                  "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-tom-s-waits-until-mensaje-del-avis-b20013dcc1.png",
                  "type": "screenshot"
                }
              ]
            },
            {
              "name": "Tomás ensures that the text of mensaje del aviso does eventually include \"No hay ningún estudiante registrado con el documento 9999999999\"",
              "outcome": "SUCCESS",
              "duration": 14,
              "children": [],
              "type": "Interaction",
              "startedAt": "2026-10-26T04:36:29.322Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/step-definitions/camila-e2e.steps.ts",
                "line": 169,
                "column": 66
              },
              "artifacts": [
                {
                  "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-tom-s-ensures-that-the-text-of-men-b20013dcc1.png",
                  "type": "screenshot"
                }
              ]
            }
          ],
          "type": "Task",
          "startedAt": "2026-10-26T04:36:28.756Z",
          "location": {
            "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila-e2e.feature",
            "line": 25
          }
        },
        {
          "name": "After",
          "outcome": "SUCCESS",
          "duration": 2,
          "children": [],
          "type": "Task",
          "startedAt": "2026-10-26T04:36:29.370Z",
          "location": {
            "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/actors.ts",
            "line": 52
          }
        }
      ],
      "executionHistory": [
        {
          "outcome": "SUCCESS",
          "run": "2026-10-26T04-36-24.665Z",
          "timestamp": "2026-10-26T04:36:24.312Z",
          "duration": 2150,
          "activities": [
            {
              "name": "Before",
              "outcome": "SUCCESS",
              "duration": 285,
              "children": [
                {
                  "name": "Preparador deja la base de datos sin usuarios, reservas ni mensajes",
                  "outcome": "SUCCESS",
                  "duration": 8,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:27.248Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/actors.ts",
                    "line": 47,
                    "column": 25
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-preparador-deja-la-base-de-datos-s-40ad070d69.png",
                      "type": "screenshot"
                    }
                  ]
                },
                {
                  "name": "Preparador registra la cuenta ana.admin@udemedellin.edu.co",
                  "outcome": "SUCCESS",
                  "duration": 23,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:27.323Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/actors.ts",
                    "line": 48,
                    "column": 60
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-preparador-registra-la-cuenta-ana--40ad070d69.png",
                      "type": "screenshot"
                    }
                  ]
                },
                {
                  "name": "Preparador registra la cuenta tomas.coach@udem.edu.co",
                  "outcome": "SUCCESS",
                  "duration": 22,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:27.382Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/actors.ts",
                    "line": 48,
                    "column": 60
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-preparador-registra-la-cuenta-toma-40ad070d69.png",
                      "type": "screenshot"
                    }
                  ]
                },
                {
                  "name": "Preparador registra la cuenta laura.est@soyudemedellin.edu.co",
                  "outcome": "SUCCESS",
                  "duration": 24,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:27.426Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/actors.ts",
                    "line": 48,
                    "column": 60
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-preparador-registra-la-cuenta-laur-40ad070d69.png",
                      "type": "screenshot"
                    }
                  ]
                },
                {
                  "name": "Preparador registra la cuenta mateo.est@soyudemedellin.edu.co",
                  "outcome": "SUCCESS",
                  "duration": 21,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:27.472Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/actors.ts",
                    "line": 48,
                    "column": 60
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-preparador-registra-la-cuenta-mate-40ad070d69.png",
                      "type": "screenshot"
                    }
                  ]
                }
              ],
              "type": "Task",
              "startedAt": "2026-10-26T04:36:27.245Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/actors.ts",
                "line": 33
              }
            },
            {
              "name": "Dado que Tomás inició sesión en el panel del gimnasio",
              "outcome": "SUCCESS",
              "duration": 968,
              "children": [
                {
                  "name": "Tomás inicia sesión como tomas.coach@udem.edu.co",
                  "outcome": "SUCCESS",
                  "duration": 708,
                  "children": [
                    {
                      "name": "Tomás navigates to \"http://localhost:5174\"",
                      "outcome": "SUCCESS",
                      "duration": 75,
                      "children": [],
                      "type": "Interaction",
                      "startedAt": "2026-10-26T04:36:27.537Z",
                      "location": {
                        "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/step-definitions/camila-e2e.steps.ts",
                        "line": 31,
                        "column": 54
                      },
                      "artifacts": [
                        {
                          "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-tom-s-navigates-to--http---localho-676377ade5.png",
                          "type": "screenshot"
                        }
                      ]
                    },
                    {
                      "name": "Tomás enters \"tomas.coach@udem.edu.co\" into campo correo",
                      "outcome": "SUCCESS",
                      "duration": 10,
                      "children": [],
                      "type": "Interaction",
                      "startedAt": "2026-10-26T04:36:27.667Z",
                      "location": {
                        "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/tasks.ts",
                        "line": 15,
                        "column": 36
                      },
                      "artifacts": [
                        {
                          "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-tom-s-enters--tomas-coach-udem-edu-5a74c6644d.png",
                          "type": "screenshot"
                        }
                      ]
                    },
                    {
                      "name": "Tomás enters \"1000000002\" into campo documento (contraseña)",
                      "outcome": "SUCCESS",
                      "duration": 58,
                      "children": [],
                      "type": "Interaction",
                      "startedAt": "2026-10-26T04:36:27.737Z",
                      "location": {
                        "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/tasks.ts",
                        "line": 16,
                        "column": 40
                      },
                      "artifacts": [
                        {
                          "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-tom-s-enters--1000000002--into-cam-99ed8eeb44.png",
                          "type": "screenshot"
                        }
                      ]
                    },
                    {
                      "name": "Tomás clicks on botón ingresar",
                      "outcome": "SUCCESS",
                      "duration": 366,
                      "children": [],
                      "type": "Interaction",
                      "startedAt": "2026-10-26T04:36:27.855Z",
                      "location": {
                        "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/tasks.ts",
                        "line": 17,
                        "column": 13
                      },
                      "artifacts": [
                        {
                          "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-tom-s-clicks-on-bot-n-ingresar-6a403a8e5e.png",
                          "type": "screenshot"
                        }
                      ]
                    }
                  ],
                  "type": "Task",
                  "startedAt": "2026-10-26T04:36:27.536Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/step-definitions/camila-e2e.steps.ts",
                    "line": 31,
                    "column": 54
                  }
                },
                {
                  "name": "Tomás abre el panel del gimnasio",
                  "outcome": "SUCCESS",
                  "duration": 231,
                  "children": [
                    {
                      "name": "Tomás waits until botón Panel does become visible",
                      "outcome": "SUCCESS",
                      "duration": 20,
                      "children": [],
                      "type": "Interaction",
                      "startedAt": "2026-10-26T04:36:28.255Z",
                      "location": {
                        "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/tasks.ts",
                        "line": 22,
                        "column": 51
                      },
                      "artifacts": [
                        {
                          "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-tom-s-waits-until-bot-n-panel-does-2508a1eb8e.png",
                          "type": "screenshot"
                        }
                      ]
                    },
                    {
                      "name": "Tomás clicks on botón Panel",
                      "outcome": "SUCCESS",
                      "duration": 58,
                      "children": [],
                      "type": "Interaction",
                      "startedAt": "2026-10-26T04:36:28.321Z",
                      "location": {
                        "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/tasks.ts",
                        "line": 22,
                        "column": 79
                      },
                      "artifacts": [
                        {
                          "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-tom-s-clicks-on-bot-n-panel-5cd4112364.png",
                          "type": "screenshot"
                        }
                      ]
                    },
                    {
                      "name": "Tomás waits until título del panel does become visible",
                      "outcome": "SUCCESS",
                      "duration": 19,
                      "children": [],
                      "type": "Interaction",
                      "startedAt": "2026-10-26T04:36:28.423Z",
                      "location": {
                        "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/tasks.ts",
                        "line": 22,
                        "column": 96
                      },
                      "artifacts": [
                        {
                          "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-tom-s-waits-until-t-tulo-del-panel-accdc9bda5.png",
                          "type": "screenshot"
                        }
                      ]
                    }
                  ],
                  "type": "Task",
                  "startedAt": "2026-10-26T04:36:28.255Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/step-definitions/camila-e2e.steps.ts",
                    "line": 31,
                    "column": 90
                  }
                }
              ],
              "type": "Task",
              "startedAt": "2026-10-26T04:36:27.530Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila-e2e.feature",
                "line": 22
              }
            },
            {
              "name": "Cuando busca en el panel al estudiante con documento \"9999999999\"",
              "outcome": "SUCCESS",
              "duration": 257,
              "children": [
                {
                  "name": "Tomás busca al estudiante con documento 9999999999",
                  "outcome": "SUCCESS",
                  "duration": 242,
                  "children": [
                    {
                      "name": "Tomás enters \"9999999999\" into campo documento del estudiante",
                      "outcome": "SUCCESS",
                      "duration": 3,
                      "children": [],
                      "type": "Interaction",
                      "startedAt": "2026-10-26T04:36:28.501Z",
                      "location": {
                        "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/tasks.ts",
                        "line": 29,
                        "column": 33
                      },
                      "artifacts": [
                        {
                          "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-tom-s-enters--9999999999--into-cam-0ecb4667e6.png",
                          "type": "screenshot"
                        }
                      ]
                    },
                    {
                      "name": "Tomás clicks on botón Buscar",
                      "outcome": "SUCCESS",
                      "duration": 159,
                      "children": [],
                      "type": "Interaction",
                      "startedAt": "2026-10-26T04:36:28.538Z",
                      "location": {
                        "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/tasks.ts",
                        "line": 30,
                        "column": 13
                      },
                      "artifacts": [
                        {
                          "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-tom-s-clicks-on-bot-n-buscar-41d3f75c5d.png",
                          "type": "screenshot"
                        }
                      ]
                    }
                  ],
                  "type": "Task",
                  "startedAt": "2026-10-26T04:36:28.501Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/step-definitions/camila-e2e.steps.ts",
                    "line": 44,
                    "column": 59
                  }
                }
              ],
              "type": "Task",
              "startedAt": "2026-10-26T04:36:28.498Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila-e2e.feature",
                "line": 23
              }
            },
            {
              "name": "Entonces debe aparecer el aviso \"No hay ningún estudiante registrado con el documento 9999999999\"",
              "outcome": "SUCCESS",
              "duration": 614,
              "children": [
                {
                  "name": "Tomás waits until mensaje del aviso does become visible",
                  "outcome": "SUCCESS",
                  "duration": 529,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:28.758Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/step-definitions/camila-e2e.steps.ts",
                    "line": 169,
                    "column": 42
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-tom-s-waits-until-mensaje-del-avis-b20013dcc1.png",
                      "type": "screenshot"
                    }
                  ]
                },
                {
                  "name": "Tomás ensures that the text of mensaje del aviso does eventually include \"No hay ningún estudiante registrado con el documento 9999999999\"",
                  "outcome": "SUCCESS",
                  "duration": 14,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:29.322Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/step-definitions/camila-e2e.steps.ts",
                    "line": 169,
                    "column": 66
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-tom-s-ensures-that-the-text-of-men-b20013dcc1.png",
                      "type": "screenshot"
                    }
                  ]
                }
              ],
              "type": "Task",
              "startedAt": "2026-10-26T04:36:28.756Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila-e2e.feature",
                "line": 25
              }
            },
            {
              "name": "After",
              "outcome": "SUCCESS",
              "duration": 2,
              "children": [],
              "type": "Task",
              "startedAt": "2026-10-26T04:36:29.370Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/actors.ts",
                "line": 52
              }
            }
          ]
        }
      ],
      "narrative": "<p>Como entrenador, administradora o estudiante del gimnasio UdeM\nQuiero usar la interfaz web\nPara comprobar los requisitos RF11, RF12, RF13, RF16, RF20 y RF21</p>\n",
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
      "id": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila-e2e.feature:21"
    },
    {
      "name": "Buscar a una estudiante que no tiene reserva activa (RF11 alterno)",
      "category": "E2E de navegador - asistencia, cierre de jornada, registro diario y buzón",
      "outcome": "SUCCESS",
      "duration": 2068,
      "startedAt": "2026-10-26T04:36:29.395Z",
      "source": {
        "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila-e2e.feature",
        "line": 28
      },
      "tags": [
        {
          "type": "feature",
          "name": "E2E de navegador - asistencia, cierre de jornada, registro diario y buzón"
        },
        {
          "type": "tag",
          "name": "camila"
        },
        {
          "type": "tag",
          "name": "rf11"
        }
      ],
      "activities": [
        {
          "name": "Before",
          "outcome": "SUCCESS",
          "duration": 273,
          "children": [
            {
              "name": "Preparador deja la base de datos sin usuarios, reservas ni mensajes",
              "outcome": "SUCCESS",
              "duration": 7,
              "children": [],
              "type": "Interaction",
              "startedAt": "2026-10-26T04:36:29.398Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/actors.ts",
                "line": 47,
                "column": 25
              },
              "artifacts": [
                {
                  "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-preparador-deja-la-base-de-datos-s-40ad070d69.png",
                  "type": "screenshot"
                }
              ]
            },
            {
              "name": "Preparador registra la cuenta ana.admin@udemedellin.edu.co",
              "outcome": "SUCCESS",
              "duration": 24,
              "children": [],
              "type": "Interaction",
              "startedAt": "2026-10-26T04:36:29.472Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/actors.ts",
                "line": 48,
                "column": 60
              },
              "artifacts": [
                {
                  "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-preparador-registra-la-cuenta-ana--40ad070d69.png",
                  "type": "screenshot"
                }
              ]
            },
            {
              "name": "Preparador registra la cuenta tomas.coach@udem.edu.co",
              "outcome": "SUCCESS",
              "duration": 23,
              "children": [],
              "type": "Interaction",
              "startedAt": "2026-10-26T04:36:29.531Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/actors.ts",
                "line": 48,
                "column": 60
              },
              "artifacts": [
                {
                  "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-preparador-registra-la-cuenta-toma-40ad070d69.png",
                  "type": "screenshot"
                }
              ]
            },
            {
              "name": "Preparador registra la cuenta laura.est@soyudemedellin.edu.co",
              "outcome": "SUCCESS",
              "duration": 23,
              "children": [],
              "type": "Interaction",
              "startedAt": "2026-10-26T04:36:29.578Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/actors.ts",
                "line": 48,
                "column": 60
              },
              "artifacts": [
                {
                  "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-preparador-registra-la-cuenta-laur-40ad070d69.png",
                  "type": "screenshot"
                }
              ]
            },
            {
              "name": "Preparador registra la cuenta mateo.est@soyudemedellin.edu.co",
              "outcome": "SUCCESS",
              "duration": 23,
              "children": [],
              "type": "Interaction",
              "startedAt": "2026-10-26T04:36:29.624Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/actors.ts",
                "line": 48,
                "column": 60
              },
              "artifacts": [
                {
                  "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-preparador-registra-la-cuenta-mate-40ad070d69.png",
                  "type": "screenshot"
                }
              ]
            }
          ],
          "type": "Task",
          "startedAt": "2026-10-26T04:36:29.396Z",
          "location": {
            "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/actors.ts",
            "line": 33
          }
        },
        {
          "name": "Dado que Tomás inició sesión en el panel del gimnasio",
          "outcome": "SUCCESS",
          "duration": 988,
          "children": [
            {
              "name": "Tomás inicia sesión como tomas.coach@udem.edu.co",
              "outcome": "SUCCESS",
              "duration": 712,
              "children": [
                {
                  "name": "Tomás navigates to \"http://localhost:5174\"",
                  "outcome": "SUCCESS",
                  "duration": 74,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:29.676Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/step-definitions/camila-e2e.steps.ts",
                    "line": 31,
                    "column": 54
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-tom-s-navigates-to--http---localho-676377ade5.png",
                      "type": "screenshot"
                    }
                  ]
                },
                {
                  "name": "Tomás enters \"tomas.coach@udem.edu.co\" into campo correo",
                  "outcome": "SUCCESS",
                  "duration": 10,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:29.806Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/tasks.ts",
                    "line": 15,
                    "column": 36
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-tom-s-enters--tomas-coach-udem-edu-5a74c6644d.png",
                      "type": "screenshot"
                    }
                  ]
                },
                {
                  "name": "Tomás enters \"1000000002\" into campo documento (contraseña)",
                  "outcome": "SUCCESS",
                  "duration": 51,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:29.873Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/tasks.ts",
                    "line": 16,
                    "column": 40
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-tom-s-enters--1000000002--into-cam-343e2689d2.png",
                      "type": "screenshot"
                    }
                  ]
                },
                {
                  "name": "Tomás clicks on botón ingresar",
                  "outcome": "SUCCESS",
                  "duration": 360,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:29.994Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/tasks.ts",
                    "line": 17,
                    "column": 13
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-tom-s-clicks-on-bot-n-ingresar-6a403a8e5e.png",
                      "type": "screenshot"
                    }
                  ]
                }
              ],
              "type": "Task",
              "startedAt": "2026-10-26T04:36:29.675Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/step-definitions/camila-e2e.steps.ts",
                "line": 31,
                "column": 54
              }
            },
            {
              "name": "Tomás abre el panel del gimnasio",
              "outcome": "SUCCESS",
              "duration": 247,
              "children": [
                {
                  "name": "Tomás waits until botón Panel does become visible",
                  "outcome": "SUCCESS",
                  "duration": 19,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:30.399Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/tasks.ts",
                    "line": 22,
                    "column": 51
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-tom-s-waits-until-bot-n-panel-does-2508a1eb8e.png",
                      "type": "screenshot"
                    }
                  ]
                },
                {
                  "name": "Tomás clicks on botón Panel",
                  "outcome": "SUCCESS",
                  "duration": 69,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:30.465Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/tasks.ts",
                    "line": 22,
                    "column": 79
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-tom-s-clicks-on-bot-n-panel-765b927df6.png",
                      "type": "screenshot"
                    }
                  ]
                },
                {
                  "name": "Tomás waits until título del panel does become visible",
                  "outcome": "SUCCESS",
                  "duration": 18,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:30.581Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/tasks.ts",
                    "line": 22,
                    "column": 96
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-tom-s-waits-until-t-tulo-del-panel-86a7092c78.png",
                      "type": "screenshot"
                    }
                  ]
                }
              ],
              "type": "Task",
              "startedAt": "2026-10-26T04:36:30.399Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/step-definitions/camila-e2e.steps.ts",
                "line": 31,
                "column": 90
              }
            }
          ],
          "type": "Task",
          "startedAt": "2026-10-26T04:36:29.669Z",
          "location": {
            "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila-e2e.feature",
            "line": 29
          }
        },
        {
          "name": "Cuando busca en el panel al estudiante con documento \"1000000003\"",
          "outcome": "SUCCESS",
          "duration": 285,
          "children": [
            {
              "name": "Tomás busca al estudiante con documento 1000000003",
              "outcome": "SUCCESS",
              "duration": 270,
              "children": [
                {
                  "name": "Tomás enters \"1000000003\" into campo documento del estudiante",
                  "outcome": "SUCCESS",
                  "duration": 3,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:30.659Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/tasks.ts",
                    "line": 29,
                    "column": 33
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-tom-s-enters--1000000003--into-cam-33876eee1c.png",
                      "type": "screenshot"
                    }
                  ]
                },
                {
                  "name": "Tomás clicks on botón Buscar",
                  "outcome": "SUCCESS",
                  "duration": 155,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:30.697Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/tasks.ts",
                    "line": 30,
                    "column": 13
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-tom-s-clicks-on-bot-n-buscar-9640c8de22.png",
                      "type": "screenshot"
                    }
                  ]
                }
              ],
              "type": "Task",
              "startedAt": "2026-10-26T04:36:30.659Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/step-definitions/camila-e2e.steps.ts",
                "line": 44,
                "column": 59
              }
            }
          ],
          "type": "Task",
          "startedAt": "2026-10-26T04:36:30.657Z",
          "location": {
            "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila-e2e.feature",
            "line": 30
          }
        },
        {
          "name": "Entonces debe ver a \"Laura Estudiante\" en el resultado",
          "outcome": "SUCCESS",
          "duration": 120,
          "children": [
            {
              "name": "Tomás waits until nombre del estudiante encontrado does become visible",
              "outcome": "SUCCESS",
              "duration": 20,
              "children": [],
              "type": "Interaction",
              "startedAt": "2026-10-26T04:36:30.946Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/step-definitions/camila-e2e.steps.ts",
                "line": 48,
                "column": 42
              },
              "artifacts": [
                {
                  "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-tom-s-waits-until-nombre-del-estud-19b73cc3e6.png",
                  "type": "screenshot"
                }
              ]
            },
            {
              "name": "Tomás ensures that the text of nombre del estudiante encontrado does eventually include \"Laura Estudiante\"",
              "outcome": "SUCCESS",
              "duration": 12,
              "children": [],
              "type": "Interaction",
              "startedAt": "2026-10-26T04:36:31.014Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/step-definitions/camila-e2e.steps.ts",
                "line": 48,
                "column": 77
              },
              "artifacts": [
                {
                  "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-tom-s-ensures-that-the-text-of-nom-4825a9ad0d.png",
                  "type": "screenshot"
                }
              ]
            }
          ],
          "type": "Task",
          "startedAt": "2026-10-26T04:36:30.942Z",
          "location": {
            "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila-e2e.feature",
            "line": 31
          }
        },
        {
          "name": "Y debe ver el aviso de estudiante sin reserva \"no tiene ninguna reserva activa\"",
          "outcome": "SUCCESS",
          "duration": 375,
          "children": [
            {
              "name": "Tomás ensures that the text of aviso de estudiante sin reserva does eventually include \"no tiene ninguna reserva activa\"",
              "outcome": "SUCCESS",
              "duration": 14,
              "children": [],
              "type": "Interaction",
              "startedAt": "2026-10-26T04:36:31.065Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/step-definitions/camila-e2e.steps.ts",
                "line": 53,
                "column": 12
              },
              "artifacts": [
                {
                  "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-tom-s-ensures-that-the-text-of-avi-7ddee1bb5c.png",
                  "type": "screenshot"
                }
              ]
            },
            {
              "name": "Tomás ensures that botón Registrar asistencia does not become present",
              "outcome": "SUCCESS",
              "duration": 253,
              "children": [],
              "type": "Interaction",
              "startedAt": "2026-10-26T04:36:31.127Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/step-definitions/camila-e2e.steps.ts",
                "line": 54,
                "column": 12
              },
              "artifacts": [
                {
                  "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-tom-s-ensures-that-bot-n-registrar-7ddee1bb5c.png",
                  "type": "screenshot"
                }
              ]
            }
          ],
          "type": "Task",
          "startedAt": "2026-10-26T04:36:31.062Z",
          "location": {
            "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila-e2e.feature",
            "line": 32
          }
        },
        {
          "name": "After",
          "outcome": "SUCCESS",
          "duration": 1,
          "children": [],
          "type": "Task",
          "startedAt": "2026-10-26T04:36:31.438Z",
          "location": {
            "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/actors.ts",
            "line": 52
          }
        }
      ],
      "executionHistory": [
        {
          "outcome": "SUCCESS",
          "run": "2026-10-26T04-36-24.665Z",
          "timestamp": "2026-10-26T04:36:24.312Z",
          "duration": 2068,
          "activities": [
            {
              "name": "Before",
              "outcome": "SUCCESS",
              "duration": 273,
              "children": [
                {
                  "name": "Preparador deja la base de datos sin usuarios, reservas ni mensajes",
                  "outcome": "SUCCESS",
                  "duration": 7,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:29.398Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/actors.ts",
                    "line": 47,
                    "column": 25
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-preparador-deja-la-base-de-datos-s-40ad070d69.png",
                      "type": "screenshot"
                    }
                  ]
                },
                {
                  "name": "Preparador registra la cuenta ana.admin@udemedellin.edu.co",
                  "outcome": "SUCCESS",
                  "duration": 24,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:29.472Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/actors.ts",
                    "line": 48,
                    "column": 60
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-preparador-registra-la-cuenta-ana--40ad070d69.png",
                      "type": "screenshot"
                    }
                  ]
                },
                {
                  "name": "Preparador registra la cuenta tomas.coach@udem.edu.co",
                  "outcome": "SUCCESS",
                  "duration": 23,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:29.531Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/actors.ts",
                    "line": 48,
                    "column": 60
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-preparador-registra-la-cuenta-toma-40ad070d69.png",
                      "type": "screenshot"
                    }
                  ]
                },
                {
                  "name": "Preparador registra la cuenta laura.est@soyudemedellin.edu.co",
                  "outcome": "SUCCESS",
                  "duration": 23,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:29.578Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/actors.ts",
                    "line": 48,
                    "column": 60
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-preparador-registra-la-cuenta-laur-40ad070d69.png",
                      "type": "screenshot"
                    }
                  ]
                },
                {
                  "name": "Preparador registra la cuenta mateo.est@soyudemedellin.edu.co",
                  "outcome": "SUCCESS",
                  "duration": 23,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:29.624Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/actors.ts",
                    "line": 48,
                    "column": 60
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-preparador-registra-la-cuenta-mate-40ad070d69.png",
                      "type": "screenshot"
                    }
                  ]
                }
              ],
              "type": "Task",
              "startedAt": "2026-10-26T04:36:29.396Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/actors.ts",
                "line": 33
              }
            },
            {
              "name": "Dado que Tomás inició sesión en el panel del gimnasio",
              "outcome": "SUCCESS",
              "duration": 988,
              "children": [
                {
                  "name": "Tomás inicia sesión como tomas.coach@udem.edu.co",
                  "outcome": "SUCCESS",
                  "duration": 712,
                  "children": [
                    {
                      "name": "Tomás navigates to \"http://localhost:5174\"",
                      "outcome": "SUCCESS",
                      "duration": 74,
                      "children": [],
                      "type": "Interaction",
                      "startedAt": "2026-10-26T04:36:29.676Z",
                      "location": {
                        "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/step-definitions/camila-e2e.steps.ts",
                        "line": 31,
                        "column": 54
                      },
                      "artifacts": [
                        {
                          "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-tom-s-navigates-to--http---localho-676377ade5.png",
                          "type": "screenshot"
                        }
                      ]
                    },
                    {
                      "name": "Tomás enters \"tomas.coach@udem.edu.co\" into campo correo",
                      "outcome": "SUCCESS",
                      "duration": 10,
                      "children": [],
                      "type": "Interaction",
                      "startedAt": "2026-10-26T04:36:29.806Z",
                      "location": {
                        "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/tasks.ts",
                        "line": 15,
                        "column": 36
                      },
                      "artifacts": [
                        {
                          "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-tom-s-enters--tomas-coach-udem-edu-5a74c6644d.png",
                          "type": "screenshot"
                        }
                      ]
                    },
                    {
                      "name": "Tomás enters \"1000000002\" into campo documento (contraseña)",
                      "outcome": "SUCCESS",
                      "duration": 51,
                      "children": [],
                      "type": "Interaction",
                      "startedAt": "2026-10-26T04:36:29.873Z",
                      "location": {
                        "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/tasks.ts",
                        "line": 16,
                        "column": 40
                      },
                      "artifacts": [
                        {
                          "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-tom-s-enters--1000000002--into-cam-343e2689d2.png",
                          "type": "screenshot"
                        }
                      ]
                    },
                    {
                      "name": "Tomás clicks on botón ingresar",
                      "outcome": "SUCCESS",
                      "duration": 360,
                      "children": [],
                      "type": "Interaction",
                      "startedAt": "2026-10-26T04:36:29.994Z",
                      "location": {
                        "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/tasks.ts",
                        "line": 17,
                        "column": 13
                      },
                      "artifacts": [
                        {
                          "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-tom-s-clicks-on-bot-n-ingresar-6a403a8e5e.png",
                          "type": "screenshot"
                        }
                      ]
                    }
                  ],
                  "type": "Task",
                  "startedAt": "2026-10-26T04:36:29.675Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/step-definitions/camila-e2e.steps.ts",
                    "line": 31,
                    "column": 54
                  }
                },
                {
                  "name": "Tomás abre el panel del gimnasio",
                  "outcome": "SUCCESS",
                  "duration": 247,
                  "children": [
                    {
                      "name": "Tomás waits until botón Panel does become visible",
                      "outcome": "SUCCESS",
                      "duration": 19,
                      "children": [],
                      "type": "Interaction",
                      "startedAt": "2026-10-26T04:36:30.399Z",
                      "location": {
                        "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/tasks.ts",
                        "line": 22,
                        "column": 51
                      },
                      "artifacts": [
                        {
                          "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-tom-s-waits-until-bot-n-panel-does-2508a1eb8e.png",
                          "type": "screenshot"
                        }
                      ]
                    },
                    {
                      "name": "Tomás clicks on botón Panel",
                      "outcome": "SUCCESS",
                      "duration": 69,
                      "children": [],
                      "type": "Interaction",
                      "startedAt": "2026-10-26T04:36:30.465Z",
                      "location": {
                        "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/tasks.ts",
                        "line": 22,
                        "column": 79
                      },
                      "artifacts": [
                        {
                          "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-tom-s-clicks-on-bot-n-panel-765b927df6.png",
                          "type": "screenshot"
                        }
                      ]
                    },
                    {
                      "name": "Tomás waits until título del panel does become visible",
                      "outcome": "SUCCESS",
                      "duration": 18,
                      "children": [],
                      "type": "Interaction",
                      "startedAt": "2026-10-26T04:36:30.581Z",
                      "location": {
                        "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/tasks.ts",
                        "line": 22,
                        "column": 96
                      },
                      "artifacts": [
                        {
                          "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-tom-s-waits-until-t-tulo-del-panel-86a7092c78.png",
                          "type": "screenshot"
                        }
                      ]
                    }
                  ],
                  "type": "Task",
                  "startedAt": "2026-10-26T04:36:30.399Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/step-definitions/camila-e2e.steps.ts",
                    "line": 31,
                    "column": 90
                  }
                }
              ],
              "type": "Task",
              "startedAt": "2026-10-26T04:36:29.669Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila-e2e.feature",
                "line": 29
              }
            },
            {
              "name": "Cuando busca en el panel al estudiante con documento \"1000000003\"",
              "outcome": "SUCCESS",
              "duration": 285,
              "children": [
                {
                  "name": "Tomás busca al estudiante con documento 1000000003",
                  "outcome": "SUCCESS",
                  "duration": 270,
                  "children": [
                    {
                      "name": "Tomás enters \"1000000003\" into campo documento del estudiante",
                      "outcome": "SUCCESS",
                      "duration": 3,
                      "children": [],
                      "type": "Interaction",
                      "startedAt": "2026-10-26T04:36:30.659Z",
                      "location": {
                        "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/tasks.ts",
                        "line": 29,
                        "column": 33
                      },
                      "artifacts": [
                        {
                          "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-tom-s-enters--1000000003--into-cam-33876eee1c.png",
                          "type": "screenshot"
                        }
                      ]
                    },
                    {
                      "name": "Tomás clicks on botón Buscar",
                      "outcome": "SUCCESS",
                      "duration": 155,
                      "children": [],
                      "type": "Interaction",
                      "startedAt": "2026-10-26T04:36:30.697Z",
                      "location": {
                        "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/tasks.ts",
                        "line": 30,
                        "column": 13
                      },
                      "artifacts": [
                        {
                          "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-tom-s-clicks-on-bot-n-buscar-9640c8de22.png",
                          "type": "screenshot"
                        }
                      ]
                    }
                  ],
                  "type": "Task",
                  "startedAt": "2026-10-26T04:36:30.659Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/step-definitions/camila-e2e.steps.ts",
                    "line": 44,
                    "column": 59
                  }
                }
              ],
              "type": "Task",
              "startedAt": "2026-10-26T04:36:30.657Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila-e2e.feature",
                "line": 30
              }
            },
            {
              "name": "Entonces debe ver a \"Laura Estudiante\" en el resultado",
              "outcome": "SUCCESS",
              "duration": 120,
              "children": [
                {
                  "name": "Tomás waits until nombre del estudiante encontrado does become visible",
                  "outcome": "SUCCESS",
                  "duration": 20,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:30.946Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/step-definitions/camila-e2e.steps.ts",
                    "line": 48,
                    "column": 42
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-tom-s-waits-until-nombre-del-estud-19b73cc3e6.png",
                      "type": "screenshot"
                    }
                  ]
                },
                {
                  "name": "Tomás ensures that the text of nombre del estudiante encontrado does eventually include \"Laura Estudiante\"",
                  "outcome": "SUCCESS",
                  "duration": 12,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:31.014Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/step-definitions/camila-e2e.steps.ts",
                    "line": 48,
                    "column": 77
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-tom-s-ensures-that-the-text-of-nom-4825a9ad0d.png",
                      "type": "screenshot"
                    }
                  ]
                }
              ],
              "type": "Task",
              "startedAt": "2026-10-26T04:36:30.942Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila-e2e.feature",
                "line": 31
              }
            },
            {
              "name": "Y debe ver el aviso de estudiante sin reserva \"no tiene ninguna reserva activa\"",
              "outcome": "SUCCESS",
              "duration": 375,
              "children": [
                {
                  "name": "Tomás ensures that the text of aviso de estudiante sin reserva does eventually include \"no tiene ninguna reserva activa\"",
                  "outcome": "SUCCESS",
                  "duration": 14,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:31.065Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/step-definitions/camila-e2e.steps.ts",
                    "line": 53,
                    "column": 12
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-tom-s-ensures-that-the-text-of-avi-7ddee1bb5c.png",
                      "type": "screenshot"
                    }
                  ]
                },
                {
                  "name": "Tomás ensures that botón Registrar asistencia does not become present",
                  "outcome": "SUCCESS",
                  "duration": 253,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:31.127Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/step-definitions/camila-e2e.steps.ts",
                    "line": 54,
                    "column": 12
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-tom-s-ensures-that-bot-n-registrar-7ddee1bb5c.png",
                      "type": "screenshot"
                    }
                  ]
                }
              ],
              "type": "Task",
              "startedAt": "2026-10-26T04:36:31.062Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila-e2e.feature",
                "line": 32
              }
            },
            {
              "name": "After",
              "outcome": "SUCCESS",
              "duration": 1,
              "children": [],
              "type": "Task",
              "startedAt": "2026-10-26T04:36:31.438Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/actors.ts",
                "line": 52
              }
            }
          ]
        }
      ],
      "narrative": "<p>Como entrenador, administradora o estudiante del gimnasio UdeM\nQuiero usar la interfaz web\nPara comprobar los requisitos RF11, RF12, RF13, RF16, RF20 y RF21</p>\n",
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
      "id": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila-e2e.feature:28"
    },
    {
      "name": "Ver a la estudiante pendiente con su documento y sus inasistencias (RF12)",
      "category": "E2E de navegador - asistencia, cierre de jornada, registro diario y buzón",
      "outcome": "SUCCESS",
      "duration": 1498,
      "startedAt": "2026-10-26T04:36:31.465Z",
      "source": {
        "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila-e2e.feature",
        "line": 36
      },
      "tags": [
        {
          "type": "feature",
          "name": "E2E de navegador - asistencia, cierre de jornada, registro diario y buzón"
        },
        {
          "type": "tag",
          "name": "camila"
        },
        {
          "type": "tag",
          "name": "rf12"
        }
      ],
      "activities": [
        {
          "name": "Before",
          "outcome": "SUCCESS",
          "duration": 275,
          "children": [
            {
              "name": "Preparador deja la base de datos sin usuarios, reservas ni mensajes",
              "outcome": "SUCCESS",
              "duration": 6,
              "children": [],
              "type": "Interaction",
              "startedAt": "2026-10-26T04:36:31.468Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/actors.ts",
                "line": 47,
                "column": 25
              },
              "artifacts": [
                {
                  "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-preparador-deja-la-base-de-datos-s-40ad070d69.png",
                  "type": "screenshot"
                }
              ]
            },
            {
              "name": "Preparador registra la cuenta ana.admin@udemedellin.edu.co",
              "outcome": "SUCCESS",
              "duration": 23,
              "children": [],
              "type": "Interaction",
              "startedAt": "2026-10-26T04:36:31.551Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/actors.ts",
                "line": 48,
                "column": 60
              },
              "artifacts": [
                {
                  "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-preparador-registra-la-cuenta-ana--40ad070d69.png",
                  "type": "screenshot"
                }
              ]
            },
            {
              "name": "Preparador registra la cuenta tomas.coach@udem.edu.co",
              "outcome": "SUCCESS",
              "duration": 21,
              "children": [],
              "type": "Interaction",
              "startedAt": "2026-10-26T04:36:31.597Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/actors.ts",
                "line": 48,
                "column": 60
              },
              "artifacts": [
                {
                  "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-preparador-registra-la-cuenta-toma-40ad070d69.png",
                  "type": "screenshot"
                }
              ]
            },
            {
              "name": "Preparador registra la cuenta laura.est@soyudemedellin.edu.co",
              "outcome": "SUCCESS",
              "duration": 20,
              "children": [],
              "type": "Interaction",
              "startedAt": "2026-10-26T04:36:31.641Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/actors.ts",
                "line": 48,
                "column": 60
              },
              "artifacts": [
                {
                  "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-preparador-registra-la-cuenta-laur-40ad070d69.png",
                  "type": "screenshot"
                }
              ]
            },
            {
              "name": "Preparador registra la cuenta mateo.est@soyudemedellin.edu.co",
              "outcome": "SUCCESS",
              "duration": 22,
              "children": [],
              "type": "Interaction",
              "startedAt": "2026-10-26T04:36:31.696Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/actors.ts",
                "line": 48,
                "column": 60
              },
              "artifacts": [
                {
                  "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-preparador-registra-la-cuenta-mate-40ad070d69.png",
                  "type": "screenshot"
                }
              ]
            }
          ],
          "type": "Task",
          "startedAt": "2026-10-26T04:36:31.466Z",
          "location": {
            "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/actors.ts",
            "line": 33
          }
        },
        {
          "name": "Dado que Laura tiene una reserva de hoy a las 06:00",
          "outcome": "SUCCESS",
          "duration": 34,
          "children": [
            {
              "name": "Preparador siembra una reserva de hoy a las 06:00 para laura.est@soyudemedellin.edu.co",
              "outcome": "SUCCESS",
              "duration": 2,
              "children": [],
              "type": "Interaction",
              "startedAt": "2026-10-26T04:36:31.742Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/step-definitions/camila-e2e.steps.ts",
                "line": 19,
                "column": 66
              },
              "artifacts": [
                {
                  "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-preparador-siembra-una-reserva-de--40ad070d69.png",
                  "type": "screenshot"
                }
              ]
            }
          ],
          "type": "Task",
          "startedAt": "2026-10-26T04:36:31.742Z",
          "location": {
            "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila-e2e.feature",
            "line": 37
          }
        },
        {
          "name": "Y que Laura ya acumula 2 inasistencias",
          "outcome": "SUCCESS",
          "duration": 37,
          "children": [
            {
              "name": "Preparador deja a laura.est@soyudemedellin.edu.co con 2 inasistencias",
              "outcome": "SUCCESS",
              "duration": 2,
              "children": [],
              "type": "Interaction",
              "startedAt": "2026-10-26T04:36:31.777Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/step-definitions/camila-e2e.steps.ts",
                "line": 23,
                "column": 65
              },
              "artifacts": [
                {
                  "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-preparador-deja-a-laura-est-soyude-40ad070d69.png",
                  "type": "screenshot"
                }
              ]
            }
          ],
          "type": "Task",
          "startedAt": "2026-10-26T04:36:31.776Z",
          "location": {
            "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila-e2e.feature",
            "line": 38
          }
        },
        {
          "name": "Y que Tomás inició sesión en el panel del gimnasio",
          "outcome": "SUCCESS",
          "duration": 969,
          "children": [
            {
              "name": "Tomás inicia sesión como tomas.coach@udem.edu.co",
              "outcome": "SUCCESS",
              "duration": 698,
              "children": [
                {
                  "name": "Tomás navigates to \"http://localhost:5174\"",
                  "outcome": "SUCCESS",
                  "duration": 70,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:31.820Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/step-definitions/camila-e2e.steps.ts",
                    "line": 31,
                    "column": 54
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-tom-s-navigates-to--http---localho-676377ade5.png",
                      "type": "screenshot"
                    }
                  ]
                },
                {
                  "name": "Tomás enters \"tomas.coach@udem.edu.co\" into campo correo",
                  "outcome": "SUCCESS",
                  "duration": 10,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:31.947Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/tasks.ts",
                    "line": 15,
                    "column": 36
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-tom-s-enters--tomas-coach-udem-edu-5a74c6644d.png",
                      "type": "screenshot"
                    }
                  ]
                },
                {
                  "name": "Tomás enters \"1000000002\" into campo documento (contraseña)",
                  "outcome": "SUCCESS",
                  "duration": 56,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:32.013Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/tasks.ts",
                    "line": 16,
                    "column": 40
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-tom-s-enters--1000000002--into-cam-e1b5703b25.png",
                      "type": "screenshot"
                    }
                  ]
                },
                {
                  "name": "Tomás clicks on botón ingresar",
                  "outcome": "SUCCESS",
                  "duration": 355,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:32.117Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/tasks.ts",
                    "line": 17,
                    "column": 13
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-tom-s-clicks-on-bot-n-ingresar-0b6feec49d.png",
                      "type": "screenshot"
                    }
                  ]
                }
              ],
              "type": "Task",
              "startedAt": "2026-10-26T04:36:31.819Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/step-definitions/camila-e2e.steps.ts",
                "line": 31,
                "column": 54
              }
            },
            {
              "name": "Tomás abre el panel del gimnasio",
              "outcome": "SUCCESS",
              "duration": 242,
              "children": [
                {
                  "name": "Tomás waits until botón Panel does become visible",
                  "outcome": "SUCCESS",
                  "duration": 21,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:32.529Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/tasks.ts",
                    "line": 22,
                    "column": 51
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-tom-s-waits-until-bot-n-panel-does-fa31052186.png",
                      "type": "screenshot"
                    }
                  ]
                },
                {
                  "name": "Tomás clicks on botón Panel",
                  "outcome": "SUCCESS",
                  "duration": 73,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:32.585Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/tasks.ts",
                    "line": 22,
                    "column": 79
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-tom-s-clicks-on-bot-n-panel-32bc1bf78b.png",
                      "type": "screenshot"
                    }
                  ]
                },
                {
                  "name": "Tomás waits until título del panel does become visible",
                  "outcome": "SUCCESS",
                  "duration": 20,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:32.704Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/tasks.ts",
                    "line": 22,
                    "column": 96
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-tom-s-waits-until-t-tulo-del-panel-96f0104ab5.png",
                      "type": "screenshot"
                    }
                  ]
                }
              ],
              "type": "Task",
              "startedAt": "2026-10-26T04:36:32.529Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/step-definitions/camila-e2e.steps.ts",
                "line": 31,
                "column": 90
              }
            }
          ],
          "type": "Task",
          "startedAt": "2026-10-26T04:36:31.813Z",
          "location": {
            "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila-e2e.feature",
            "line": 39
          }
        },
        {
          "name": "Entonces debe ver 1 reservas sin asistencia",
          "outcome": "SUCCESS",
          "duration": 52,
          "children": [
            {
              "name": "Tomás ensures that the number of filas de reservas pendientes does eventually equal 1",
              "outcome": "SUCCESS",
              "duration": 15,
              "children": [],
              "type": "Interaction",
              "startedAt": "2026-10-26T04:36:32.784Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/step-definitions/camila-e2e.steps.ts",
                "line": 64,
                "column": 49
              },
              "artifacts": [
                {
                  "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-tom-s-ensures-that-the-number-of-f-26d156ae88.png",
                  "type": "screenshot"
                }
              ]
            }
          ],
          "type": "Task",
          "startedAt": "2026-10-26T04:36:32.782Z",
          "location": {
            "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila-e2e.feature",
            "line": 40
          }
        },
        {
          "name": "Y el pendiente debe mostrar el documento \"1000000003\"",
          "outcome": "SUCCESS",
          "duration": 52,
          "children": [
            {
              "name": "Tomás ensures that the text of documento del pendiente does eventually include \"1000000003\"",
              "outcome": "SUCCESS",
              "duration": 14,
              "children": [],
              "type": "Interaction",
              "startedAt": "2026-10-26T04:36:32.836Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/step-definitions/camila-e2e.steps.ts",
                "line": 72,
                "column": 49
              },
              "artifacts": [
                {
                  "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-tom-s-ensures-that-the-text-of-doc-cec25f1ffa.png",
                  "type": "screenshot"
                }
              ]
            }
          ],
          "type": "Task",
          "startedAt": "2026-10-26T04:36:32.834Z",
          "location": {
            "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila-e2e.feature",
            "line": 41
          }
        },
        {
          "name": "Y el pendiente debe indicar que le \"faltan 3\"",
          "outcome": "SUCCESS",
          "duration": 52,
          "children": [
            {
              "name": "Tomás ensures that the text of inasistencias que le faltan does eventually include \"faltan 3\"",
              "outcome": "SUCCESS",
              "duration": 14,
              "children": [],
              "type": "Interaction",
              "startedAt": "2026-10-26T04:36:32.888Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/step-definitions/camila-e2e.steps.ts",
                "line": 76,
                "column": 49
              },
              "artifacts": [
                {
                  "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-tom-s-ensures-that-the-text-of-ina-82dae48123.png",
                  "type": "screenshot"
                }
              ]
            }
          ],
          "type": "Task",
          "startedAt": "2026-10-26T04:36:32.886Z",
          "location": {
            "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila-e2e.feature",
            "line": 42
          }
        },
        {
          "name": "After",
          "outcome": "SUCCESS",
          "duration": 1,
          "children": [],
          "type": "Task",
          "startedAt": "2026-10-26T04:36:32.939Z",
          "location": {
            "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/actors.ts",
            "line": 52
          }
        }
      ],
      "executionHistory": [
        {
          "outcome": "SUCCESS",
          "run": "2026-10-26T04-36-24.665Z",
          "timestamp": "2026-10-26T04:36:24.312Z",
          "duration": 1498,
          "activities": [
            {
              "name": "Before",
              "outcome": "SUCCESS",
              "duration": 275,
              "children": [
                {
                  "name": "Preparador deja la base de datos sin usuarios, reservas ni mensajes",
                  "outcome": "SUCCESS",
                  "duration": 6,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:31.468Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/actors.ts",
                    "line": 47,
                    "column": 25
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-preparador-deja-la-base-de-datos-s-40ad070d69.png",
                      "type": "screenshot"
                    }
                  ]
                },
                {
                  "name": "Preparador registra la cuenta ana.admin@udemedellin.edu.co",
                  "outcome": "SUCCESS",
                  "duration": 23,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:31.551Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/actors.ts",
                    "line": 48,
                    "column": 60
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-preparador-registra-la-cuenta-ana--40ad070d69.png",
                      "type": "screenshot"
                    }
                  ]
                },
                {
                  "name": "Preparador registra la cuenta tomas.coach@udem.edu.co",
                  "outcome": "SUCCESS",
                  "duration": 21,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:31.597Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/actors.ts",
                    "line": 48,
                    "column": 60
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-preparador-registra-la-cuenta-toma-40ad070d69.png",
                      "type": "screenshot"
                    }
                  ]
                },
                {
                  "name": "Preparador registra la cuenta laura.est@soyudemedellin.edu.co",
                  "outcome": "SUCCESS",
                  "duration": 20,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:31.641Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/actors.ts",
                    "line": 48,
                    "column": 60
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-preparador-registra-la-cuenta-laur-40ad070d69.png",
                      "type": "screenshot"
                    }
                  ]
                },
                {
                  "name": "Preparador registra la cuenta mateo.est@soyudemedellin.edu.co",
                  "outcome": "SUCCESS",
                  "duration": 22,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:31.696Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/actors.ts",
                    "line": 48,
                    "column": 60
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-preparador-registra-la-cuenta-mate-40ad070d69.png",
                      "type": "screenshot"
                    }
                  ]
                }
              ],
              "type": "Task",
              "startedAt": "2026-10-26T04:36:31.466Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/actors.ts",
                "line": 33
              }
            },
            {
              "name": "Dado que Laura tiene una reserva de hoy a las 06:00",
              "outcome": "SUCCESS",
              "duration": 34,
              "children": [
                {
                  "name": "Preparador siembra una reserva de hoy a las 06:00 para laura.est@soyudemedellin.edu.co",
                  "outcome": "SUCCESS",
                  "duration": 2,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:31.742Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/step-definitions/camila-e2e.steps.ts",
                    "line": 19,
                    "column": 66
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-preparador-siembra-una-reserva-de--40ad070d69.png",
                      "type": "screenshot"
                    }
                  ]
                }
              ],
              "type": "Task",
              "startedAt": "2026-10-26T04:36:31.742Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila-e2e.feature",
                "line": 37
              }
            },
            {
              "name": "Y que Laura ya acumula 2 inasistencias",
              "outcome": "SUCCESS",
              "duration": 37,
              "children": [
                {
                  "name": "Preparador deja a laura.est@soyudemedellin.edu.co con 2 inasistencias",
                  "outcome": "SUCCESS",
                  "duration": 2,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:31.777Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/step-definitions/camila-e2e.steps.ts",
                    "line": 23,
                    "column": 65
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-preparador-deja-a-laura-est-soyude-40ad070d69.png",
                      "type": "screenshot"
                    }
                  ]
                }
              ],
              "type": "Task",
              "startedAt": "2026-10-26T04:36:31.776Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila-e2e.feature",
                "line": 38
              }
            },
            {
              "name": "Y que Tomás inició sesión en el panel del gimnasio",
              "outcome": "SUCCESS",
              "duration": 969,
              "children": [
                {
                  "name": "Tomás inicia sesión como tomas.coach@udem.edu.co",
                  "outcome": "SUCCESS",
                  "duration": 698,
                  "children": [
                    {
                      "name": "Tomás navigates to \"http://localhost:5174\"",
                      "outcome": "SUCCESS",
                      "duration": 70,
                      "children": [],
                      "type": "Interaction",
                      "startedAt": "2026-10-26T04:36:31.820Z",
                      "location": {
                        "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/step-definitions/camila-e2e.steps.ts",
                        "line": 31,
                        "column": 54
                      },
                      "artifacts": [
                        {
                          "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-tom-s-navigates-to--http---localho-676377ade5.png",
                          "type": "screenshot"
                        }
                      ]
                    },
                    {
                      "name": "Tomás enters \"tomas.coach@udem.edu.co\" into campo correo",
                      "outcome": "SUCCESS",
                      "duration": 10,
                      "children": [],
                      "type": "Interaction",
                      "startedAt": "2026-10-26T04:36:31.947Z",
                      "location": {
                        "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/tasks.ts",
                        "line": 15,
                        "column": 36
                      },
                      "artifacts": [
                        {
                          "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-tom-s-enters--tomas-coach-udem-edu-5a74c6644d.png",
                          "type": "screenshot"
                        }
                      ]
                    },
                    {
                      "name": "Tomás enters \"1000000002\" into campo documento (contraseña)",
                      "outcome": "SUCCESS",
                      "duration": 56,
                      "children": [],
                      "type": "Interaction",
                      "startedAt": "2026-10-26T04:36:32.013Z",
                      "location": {
                        "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/tasks.ts",
                        "line": 16,
                        "column": 40
                      },
                      "artifacts": [
                        {
                          "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-tom-s-enters--1000000002--into-cam-e1b5703b25.png",
                          "type": "screenshot"
                        }
                      ]
                    },
                    {
                      "name": "Tomás clicks on botón ingresar",
                      "outcome": "SUCCESS",
                      "duration": 355,
                      "children": [],
                      "type": "Interaction",
                      "startedAt": "2026-10-26T04:36:32.117Z",
                      "location": {
                        "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/tasks.ts",
                        "line": 17,
                        "column": 13
                      },
                      "artifacts": [
                        {
                          "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-tom-s-clicks-on-bot-n-ingresar-0b6feec49d.png",
                          "type": "screenshot"
                        }
                      ]
                    }
                  ],
                  "type": "Task",
                  "startedAt": "2026-10-26T04:36:31.819Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/step-definitions/camila-e2e.steps.ts",
                    "line": 31,
                    "column": 54
                  }
                },
                {
                  "name": "Tomás abre el panel del gimnasio",
                  "outcome": "SUCCESS",
                  "duration": 242,
                  "children": [
                    {
                      "name": "Tomás waits until botón Panel does become visible",
                      "outcome": "SUCCESS",
                      "duration": 21,
                      "children": [],
                      "type": "Interaction",
                      "startedAt": "2026-10-26T04:36:32.529Z",
                      "location": {
                        "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/tasks.ts",
                        "line": 22,
                        "column": 51
                      },
                      "artifacts": [
                        {
                          "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-tom-s-waits-until-bot-n-panel-does-fa31052186.png",
                          "type": "screenshot"
                        }
                      ]
                    },
                    {
                      "name": "Tomás clicks on botón Panel",
                      "outcome": "SUCCESS",
                      "duration": 73,
                      "children": [],
                      "type": "Interaction",
                      "startedAt": "2026-10-26T04:36:32.585Z",
                      "location": {
                        "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/tasks.ts",
                        "line": 22,
                        "column": 79
                      },
                      "artifacts": [
                        {
                          "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-tom-s-clicks-on-bot-n-panel-32bc1bf78b.png",
                          "type": "screenshot"
                        }
                      ]
                    },
                    {
                      "name": "Tomás waits until título del panel does become visible",
                      "outcome": "SUCCESS",
                      "duration": 20,
                      "children": [],
                      "type": "Interaction",
                      "startedAt": "2026-10-26T04:36:32.704Z",
                      "location": {
                        "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/tasks.ts",
                        "line": 22,
                        "column": 96
                      },
                      "artifacts": [
                        {
                          "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-tom-s-waits-until-t-tulo-del-panel-96f0104ab5.png",
                          "type": "screenshot"
                        }
                      ]
                    }
                  ],
                  "type": "Task",
                  "startedAt": "2026-10-26T04:36:32.529Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/step-definitions/camila-e2e.steps.ts",
                    "line": 31,
                    "column": 90
                  }
                }
              ],
              "type": "Task",
              "startedAt": "2026-10-26T04:36:31.813Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila-e2e.feature",
                "line": 39
              }
            },
            {
              "name": "Entonces debe ver 1 reservas sin asistencia",
              "outcome": "SUCCESS",
              "duration": 52,
              "children": [
                {
                  "name": "Tomás ensures that the number of filas de reservas pendientes does eventually equal 1",
                  "outcome": "SUCCESS",
                  "duration": 15,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:32.784Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/step-definitions/camila-e2e.steps.ts",
                    "line": 64,
                    "column": 49
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-tom-s-ensures-that-the-number-of-f-26d156ae88.png",
                      "type": "screenshot"
                    }
                  ]
                }
              ],
              "type": "Task",
              "startedAt": "2026-10-26T04:36:32.782Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila-e2e.feature",
                "line": 40
              }
            },
            {
              "name": "Y el pendiente debe mostrar el documento \"1000000003\"",
              "outcome": "SUCCESS",
              "duration": 52,
              "children": [
                {
                  "name": "Tomás ensures that the text of documento del pendiente does eventually include \"1000000003\"",
                  "outcome": "SUCCESS",
                  "duration": 14,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:32.836Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/step-definitions/camila-e2e.steps.ts",
                    "line": 72,
                    "column": 49
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-tom-s-ensures-that-the-text-of-doc-cec25f1ffa.png",
                      "type": "screenshot"
                    }
                  ]
                }
              ],
              "type": "Task",
              "startedAt": "2026-10-26T04:36:32.834Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila-e2e.feature",
                "line": 41
              }
            },
            {
              "name": "Y el pendiente debe indicar que le \"faltan 3\"",
              "outcome": "SUCCESS",
              "duration": 52,
              "children": [
                {
                  "name": "Tomás ensures that the text of inasistencias que le faltan does eventually include \"faltan 3\"",
                  "outcome": "SUCCESS",
                  "duration": 14,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:32.888Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/step-definitions/camila-e2e.steps.ts",
                    "line": 76,
                    "column": 49
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-tom-s-ensures-that-the-text-of-ina-82dae48123.png",
                      "type": "screenshot"
                    }
                  ]
                }
              ],
              "type": "Task",
              "startedAt": "2026-10-26T04:36:32.886Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila-e2e.feature",
                "line": 42
              }
            },
            {
              "name": "After",
              "outcome": "SUCCESS",
              "duration": 1,
              "children": [],
              "type": "Task",
              "startedAt": "2026-10-26T04:36:32.939Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/actors.ts",
                "line": 52
              }
            }
          ]
        }
      ],
      "narrative": "<p>Como entrenador, administradora o estudiante del gimnasio UdeM\nQuiero usar la interfaz web\nPara comprobar los requisitos RF11, RF12, RF13, RF16, RF20 y RF21</p>\n",
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
      "id": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila-e2e.feature:36"
    },
    {
      "name": "Jornada sin reservas pendientes (RF12 alterno)",
      "category": "E2E de navegador - asistencia, cierre de jornada, registro diario y buzón",
      "outcome": "SUCCESS",
      "duration": 1324,
      "startedAt": "2026-10-26T04:36:32.965Z",
      "source": {
        "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila-e2e.feature",
        "line": 45
      },
      "tags": [
        {
          "type": "feature",
          "name": "E2E de navegador - asistencia, cierre de jornada, registro diario y buzón"
        },
        {
          "type": "tag",
          "name": "camila"
        },
        {
          "type": "tag",
          "name": "rf12"
        }
      ],
      "activities": [
        {
          "name": "Before",
          "outcome": "SUCCESS",
          "duration": 281,
          "children": [
            {
              "name": "Preparador deja la base de datos sin usuarios, reservas ni mensajes",
              "outcome": "SUCCESS",
              "duration": 6,
              "children": [],
              "type": "Interaction",
              "startedAt": "2026-10-26T04:36:32.968Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/actors.ts",
                "line": 47,
                "column": 25
              },
              "artifacts": [
                {
                  "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-preparador-deja-la-base-de-datos-s-40ad070d69.png",
                  "type": "screenshot"
                }
              ]
            },
            {
              "name": "Preparador registra la cuenta ana.admin@udemedellin.edu.co",
              "outcome": "SUCCESS",
              "duration": 23,
              "children": [],
              "type": "Interaction",
              "startedAt": "2026-10-26T04:36:33.042Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/actors.ts",
                "line": 48,
                "column": 60
              },
              "artifacts": [
                {
                  "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-preparador-registra-la-cuenta-ana--40ad070d69.png",
                  "type": "screenshot"
                }
              ]
            },
            {
              "name": "Preparador registra la cuenta tomas.coach@udem.edu.co",
              "outcome": "SUCCESS",
              "duration": 22,
              "children": [],
              "type": "Interaction",
              "startedAt": "2026-10-26T04:36:33.097Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/actors.ts",
                "line": 48,
                "column": 60
              },
              "artifacts": [
                {
                  "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-preparador-registra-la-cuenta-toma-40ad070d69.png",
                  "type": "screenshot"
                }
              ]
            },
            {
              "name": "Preparador registra la cuenta laura.est@soyudemedellin.edu.co",
              "outcome": "SUCCESS",
              "duration": 23,
              "children": [],
              "type": "Interaction",
              "startedAt": "2026-10-26T04:36:33.142Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/actors.ts",
                "line": 48,
                "column": 60
              },
              "artifacts": [
                {
                  "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-preparador-registra-la-cuenta-laur-40ad070d69.png",
                  "type": "screenshot"
                }
              ]
            },
            {
              "name": "Preparador registra la cuenta mateo.est@soyudemedellin.edu.co",
              "outcome": "SUCCESS",
              "duration": 24,
              "children": [],
              "type": "Interaction",
              "startedAt": "2026-10-26T04:36:33.187Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/actors.ts",
                "line": 48,
                "column": 60
              },
              "artifacts": [
                {
                  "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-preparador-registra-la-cuenta-mate-40ad070d69.png",
                  "type": "screenshot"
                }
              ]
            }
          ],
          "type": "Task",
          "startedAt": "2026-10-26T04:36:32.966Z",
          "location": {
            "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/actors.ts",
            "line": 33
          }
        },
        {
          "name": "Dado que Tomás inició sesión en el panel del gimnasio",
          "outcome": "SUCCESS",
          "duration": 969,
          "children": [
            {
              "name": "Tomás inicia sesión como tomas.coach@udem.edu.co",
              "outcome": "SUCCESS",
              "duration": 696,
              "children": [
                {
                  "name": "Tomás navigates to \"http://localhost:5174\"",
                  "outcome": "SUCCESS",
                  "duration": 72,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:33.253Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/step-definitions/camila-e2e.steps.ts",
                    "line": 31,
                    "column": 54
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-tom-s-navigates-to--http---localho-676377ade5.png",
                      "type": "screenshot"
                    }
                  ]
                },
                {
                  "name": "Tomás enters \"tomas.coach@udem.edu.co\" into campo correo",
                  "outcome": "SUCCESS",
                  "duration": 10,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:33.379Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/tasks.ts",
                    "line": 15,
                    "column": 36
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-tom-s-enters--tomas-coach-udem-edu-5dc811ee27.png",
                      "type": "screenshot"
                    }
                  ]
                },
                {
                  "name": "Tomás enters \"1000000002\" into campo documento (contraseña)",
                  "outcome": "SUCCESS",
                  "duration": 62,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:33.437Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/tasks.ts",
                    "line": 16,
                    "column": 40
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-tom-s-enters--1000000002--into-cam-ccc650a8d1.png",
                      "type": "screenshot"
                    }
                  ]
                },
                {
                  "name": "Tomás clicks on botón ingresar",
                  "outcome": "SUCCESS",
                  "duration": 358,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:33.556Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/tasks.ts",
                    "line": 17,
                    "column": 13
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-tom-s-clicks-on-bot-n-ingresar-6a403a8e5e.png",
                      "type": "screenshot"
                    }
                  ]
                }
              ],
              "type": "Task",
              "startedAt": "2026-10-26T04:36:33.253Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/step-definitions/camila-e2e.steps.ts",
                "line": 31,
                "column": 54
              }
            },
            {
              "name": "Tomás abre el panel del gimnasio",
              "outcome": "SUCCESS",
              "duration": 244,
              "children": [
                {
                  "name": "Tomás waits until botón Panel does become visible",
                  "outcome": "SUCCESS",
                  "duration": 18,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:33.960Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/tasks.ts",
                    "line": 22,
                    "column": 51
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-tom-s-waits-until-bot-n-panel-does-2508a1eb8e.png",
                      "type": "screenshot"
                    }
                  ]
                },
                {
                  "name": "Tomás clicks on botón Panel",
                  "outcome": "SUCCESS",
                  "duration": 71,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:34.023Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/tasks.ts",
                    "line": 22,
                    "column": 79
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-tom-s-clicks-on-bot-n-panel-765b927df6.png",
                      "type": "screenshot"
                    }
                  ]
                },
                {
                  "name": "Tomás waits until título del panel does become visible",
                  "outcome": "SUCCESS",
                  "duration": 18,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:34.140Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/tasks.ts",
                    "line": 22,
                    "column": 96
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-tom-s-waits-until-t-tulo-del-panel-86a7092c78.png",
                      "type": "screenshot"
                    }
                  ]
                }
              ],
              "type": "Task",
              "startedAt": "2026-10-26T04:36:33.960Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/step-definitions/camila-e2e.steps.ts",
                "line": 31,
                "column": 90
              }
            }
          ],
          "type": "Task",
          "startedAt": "2026-10-26T04:36:33.248Z",
          "location": {
            "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila-e2e.feature",
            "line": 46
          }
        },
        {
          "name": "Entonces debe ver el aviso de jornada sin pendientes \"No hay estudiantes pendientes\"",
          "outcome": "SUCCESS",
          "duration": 48,
          "children": [
            {
              "name": "Tomás ensures that the text of aviso de jornada sin pendientes does eventually include \"No hay estudiantes pendientes\"",
              "outcome": "SUCCESS",
              "duration": 13,
              "children": [],
              "type": "Interaction",
              "startedAt": "2026-10-26T04:36:34.219Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/step-definitions/camila-e2e.steps.ts",
                "line": 80,
                "column": 49
              },
              "artifacts": [
                {
                  "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-tom-s-ensures-that-the-text-of-avi-7fac896b56.png",
                  "type": "screenshot"
                }
              ]
            }
          ],
          "type": "Task",
          "startedAt": "2026-10-26T04:36:34.217Z",
          "location": {
            "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila-e2e.feature",
            "line": 47
          }
        },
        {
          "name": "After",
          "outcome": "SUCCESS",
          "duration": 1,
          "children": [],
          "type": "Task",
          "startedAt": "2026-10-26T04:36:34.265Z",
          "location": {
            "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/actors.ts",
            "line": 52
          }
        }
      ],
      "executionHistory": [
        {
          "outcome": "SUCCESS",
          "run": "2026-10-26T04-36-24.665Z",
          "timestamp": "2026-10-26T04:36:24.312Z",
          "duration": 1324,
          "activities": [
            {
              "name": "Before",
              "outcome": "SUCCESS",
              "duration": 281,
              "children": [
                {
                  "name": "Preparador deja la base de datos sin usuarios, reservas ni mensajes",
                  "outcome": "SUCCESS",
                  "duration": 6,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:32.968Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/actors.ts",
                    "line": 47,
                    "column": 25
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-preparador-deja-la-base-de-datos-s-40ad070d69.png",
                      "type": "screenshot"
                    }
                  ]
                },
                {
                  "name": "Preparador registra la cuenta ana.admin@udemedellin.edu.co",
                  "outcome": "SUCCESS",
                  "duration": 23,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:33.042Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/actors.ts",
                    "line": 48,
                    "column": 60
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-preparador-registra-la-cuenta-ana--40ad070d69.png",
                      "type": "screenshot"
                    }
                  ]
                },
                {
                  "name": "Preparador registra la cuenta tomas.coach@udem.edu.co",
                  "outcome": "SUCCESS",
                  "duration": 22,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:33.097Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/actors.ts",
                    "line": 48,
                    "column": 60
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-preparador-registra-la-cuenta-toma-40ad070d69.png",
                      "type": "screenshot"
                    }
                  ]
                },
                {
                  "name": "Preparador registra la cuenta laura.est@soyudemedellin.edu.co",
                  "outcome": "SUCCESS",
                  "duration": 23,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:33.142Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/actors.ts",
                    "line": 48,
                    "column": 60
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-preparador-registra-la-cuenta-laur-40ad070d69.png",
                      "type": "screenshot"
                    }
                  ]
                },
                {
                  "name": "Preparador registra la cuenta mateo.est@soyudemedellin.edu.co",
                  "outcome": "SUCCESS",
                  "duration": 24,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:33.187Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/actors.ts",
                    "line": 48,
                    "column": 60
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-preparador-registra-la-cuenta-mate-40ad070d69.png",
                      "type": "screenshot"
                    }
                  ]
                }
              ],
              "type": "Task",
              "startedAt": "2026-10-26T04:36:32.966Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/actors.ts",
                "line": 33
              }
            },
            {
              "name": "Dado que Tomás inició sesión en el panel del gimnasio",
              "outcome": "SUCCESS",
              "duration": 969,
              "children": [
                {
                  "name": "Tomás inicia sesión como tomas.coach@udem.edu.co",
                  "outcome": "SUCCESS",
                  "duration": 696,
                  "children": [
                    {
                      "name": "Tomás navigates to \"http://localhost:5174\"",
                      "outcome": "SUCCESS",
                      "duration": 72,
                      "children": [],
                      "type": "Interaction",
                      "startedAt": "2026-10-26T04:36:33.253Z",
                      "location": {
                        "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/step-definitions/camila-e2e.steps.ts",
                        "line": 31,
                        "column": 54
                      },
                      "artifacts": [
                        {
                          "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-tom-s-navigates-to--http---localho-676377ade5.png",
                          "type": "screenshot"
                        }
                      ]
                    },
                    {
                      "name": "Tomás enters \"tomas.coach@udem.edu.co\" into campo correo",
                      "outcome": "SUCCESS",
                      "duration": 10,
                      "children": [],
                      "type": "Interaction",
                      "startedAt": "2026-10-26T04:36:33.379Z",
                      "location": {
                        "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/tasks.ts",
                        "line": 15,
                        "column": 36
                      },
                      "artifacts": [
                        {
                          "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-tom-s-enters--tomas-coach-udem-edu-5dc811ee27.png",
                          "type": "screenshot"
                        }
                      ]
                    },
                    {
                      "name": "Tomás enters \"1000000002\" into campo documento (contraseña)",
                      "outcome": "SUCCESS",
                      "duration": 62,
                      "children": [],
                      "type": "Interaction",
                      "startedAt": "2026-10-26T04:36:33.437Z",
                      "location": {
                        "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/tasks.ts",
                        "line": 16,
                        "column": 40
                      },
                      "artifacts": [
                        {
                          "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-tom-s-enters--1000000002--into-cam-ccc650a8d1.png",
                          "type": "screenshot"
                        }
                      ]
                    },
                    {
                      "name": "Tomás clicks on botón ingresar",
                      "outcome": "SUCCESS",
                      "duration": 358,
                      "children": [],
                      "type": "Interaction",
                      "startedAt": "2026-10-26T04:36:33.556Z",
                      "location": {
                        "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/tasks.ts",
                        "line": 17,
                        "column": 13
                      },
                      "artifacts": [
                        {
                          "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-tom-s-clicks-on-bot-n-ingresar-6a403a8e5e.png",
                          "type": "screenshot"
                        }
                      ]
                    }
                  ],
                  "type": "Task",
                  "startedAt": "2026-10-26T04:36:33.253Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/step-definitions/camila-e2e.steps.ts",
                    "line": 31,
                    "column": 54
                  }
                },
                {
                  "name": "Tomás abre el panel del gimnasio",
                  "outcome": "SUCCESS",
                  "duration": 244,
                  "children": [
                    {
                      "name": "Tomás waits until botón Panel does become visible",
                      "outcome": "SUCCESS",
                      "duration": 18,
                      "children": [],
                      "type": "Interaction",
                      "startedAt": "2026-10-26T04:36:33.960Z",
                      "location": {
                        "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/tasks.ts",
                        "line": 22,
                        "column": 51
                      },
                      "artifacts": [
                        {
                          "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-tom-s-waits-until-bot-n-panel-does-2508a1eb8e.png",
                          "type": "screenshot"
                        }
                      ]
                    },
                    {
                      "name": "Tomás clicks on botón Panel",
                      "outcome": "SUCCESS",
                      "duration": 71,
                      "children": [],
                      "type": "Interaction",
                      "startedAt": "2026-10-26T04:36:34.023Z",
                      "location": {
                        "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/tasks.ts",
                        "line": 22,
                        "column": 79
                      },
                      "artifacts": [
                        {
                          "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-tom-s-clicks-on-bot-n-panel-765b927df6.png",
                          "type": "screenshot"
                        }
                      ]
                    },
                    {
                      "name": "Tomás waits until título del panel does become visible",
                      "outcome": "SUCCESS",
                      "duration": 18,
                      "children": [],
                      "type": "Interaction",
                      "startedAt": "2026-10-26T04:36:34.140Z",
                      "location": {
                        "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/tasks.ts",
                        "line": 22,
                        "column": 96
                      },
                      "artifacts": [
                        {
                          "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-tom-s-waits-until-t-tulo-del-panel-86a7092c78.png",
                          "type": "screenshot"
                        }
                      ]
                    }
                  ],
                  "type": "Task",
                  "startedAt": "2026-10-26T04:36:33.960Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/step-definitions/camila-e2e.steps.ts",
                    "line": 31,
                    "column": 90
                  }
                }
              ],
              "type": "Task",
              "startedAt": "2026-10-26T04:36:33.248Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila-e2e.feature",
                "line": 46
              }
            },
            {
              "name": "Entonces debe ver el aviso de jornada sin pendientes \"No hay estudiantes pendientes\"",
              "outcome": "SUCCESS",
              "duration": 48,
              "children": [
                {
                  "name": "Tomás ensures that the text of aviso de jornada sin pendientes does eventually include \"No hay estudiantes pendientes\"",
                  "outcome": "SUCCESS",
                  "duration": 13,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:34.219Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/step-definitions/camila-e2e.steps.ts",
                    "line": 80,
                    "column": 49
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-tom-s-ensures-that-the-text-of-avi-7fac896b56.png",
                      "type": "screenshot"
                    }
                  ]
                }
              ],
              "type": "Task",
              "startedAt": "2026-10-26T04:36:34.217Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila-e2e.feature",
                "line": 47
              }
            },
            {
              "name": "After",
              "outcome": "SUCCESS",
              "duration": 1,
              "children": [],
              "type": "Task",
              "startedAt": "2026-10-26T04:36:34.265Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/actors.ts",
                "line": 52
              }
            }
          ]
        }
      ],
      "narrative": "<p>Como entrenador, administradora o estudiante del gimnasio UdeM\nQuiero usar la interfaz web\nPara comprobar los requisitos RF11, RF12, RF13, RF16, RF20 y RF21</p>\n",
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
      "id": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila-e2e.feature:45"
    },
    {
      "name": "Cerrar la jornada confirmando el cierre (RF13)",
      "category": "E2E de navegador - asistencia, cierre de jornada, registro diario y buzón",
      "outcome": "SUCCESS",
      "duration": 1819,
      "startedAt": "2026-10-26T04:36:34.291Z",
      "source": {
        "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila-e2e.feature",
        "line": 51
      },
      "tags": [
        {
          "type": "feature",
          "name": "E2E de navegador - asistencia, cierre de jornada, registro diario y buzón"
        },
        {
          "type": "tag",
          "name": "camila"
        },
        {
          "type": "tag",
          "name": "rf13"
        },
        {
          "type": "tag",
          "name": "rf16"
        }
      ],
      "activities": [
        {
          "name": "Before",
          "outcome": "SUCCESS",
          "duration": 278,
          "children": [
            {
              "name": "Preparador deja la base de datos sin usuarios, reservas ni mensajes",
              "outcome": "SUCCESS",
              "duration": 5,
              "children": [],
              "type": "Interaction",
              "startedAt": "2026-10-26T04:36:34.294Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/actors.ts",
                "line": 47,
                "column": 25
              },
              "artifacts": [
                {
                  "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-preparador-deja-la-base-de-datos-s-40ad070d69.png",
                  "type": "screenshot"
                }
              ]
            },
            {
              "name": "Preparador registra la cuenta ana.admin@udemedellin.edu.co",
              "outcome": "SUCCESS",
              "duration": 23,
              "children": [],
              "type": "Interaction",
              "startedAt": "2026-10-26T04:36:34.381Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/actors.ts",
                "line": 48,
                "column": 60
              },
              "artifacts": [
                {
                  "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-preparador-registra-la-cuenta-ana--40ad070d69.png",
                  "type": "screenshot"
                }
              ]
            },
            {
              "name": "Preparador registra la cuenta tomas.coach@udem.edu.co",
              "outcome": "SUCCESS",
              "duration": 23,
              "children": [],
              "type": "Interaction",
              "startedAt": "2026-10-26T04:36:34.436Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/actors.ts",
                "line": 48,
                "column": 60
              },
              "artifacts": [
                {
                  "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-preparador-registra-la-cuenta-toma-40ad070d69.png",
                  "type": "screenshot"
                }
              ]
            },
            {
              "name": "Preparador registra la cuenta laura.est@soyudemedellin.edu.co",
              "outcome": "SUCCESS",
              "duration": 22,
              "children": [],
              "type": "Interaction",
              "startedAt": "2026-10-26T04:36:34.481Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/actors.ts",
                "line": 48,
                "column": 60
              },
              "artifacts": [
                {
                  "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-preparador-registra-la-cuenta-laur-40ad070d69.png",
                  "type": "screenshot"
                }
              ]
            },
            {
              "name": "Preparador registra la cuenta mateo.est@soyudemedellin.edu.co",
              "outcome": "SUCCESS",
              "duration": 22,
              "children": [],
              "type": "Interaction",
              "startedAt": "2026-10-26T04:36:34.526Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/actors.ts",
                "line": 48,
                "column": 60
              },
              "artifacts": [
                {
                  "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-preparador-registra-la-cuenta-mate-40ad070d69.png",
                  "type": "screenshot"
                }
              ]
            }
          ],
          "type": "Task",
          "startedAt": "2026-10-26T04:36:34.292Z",
          "location": {
            "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/actors.ts",
            "line": 33
          }
        },
        {
          "name": "Dado que Laura tiene una reserva de hoy a las 06:00",
          "outcome": "SUCCESS",
          "duration": 37,
          "children": [
            {
              "name": "Preparador siembra una reserva de hoy a las 06:00 para laura.est@soyudemedellin.edu.co",
              "outcome": "SUCCESS",
              "duration": 2,
              "children": [],
              "type": "Interaction",
              "startedAt": "2026-10-26T04:36:34.570Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/step-definitions/camila-e2e.steps.ts",
                "line": 19,
                "column": 66
              },
              "artifacts": [
                {
                  "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-preparador-siembra-una-reserva-de--40ad070d69.png",
                  "type": "screenshot"
                }
              ]
            }
          ],
          "type": "Task",
          "startedAt": "2026-10-26T04:36:34.570Z",
          "location": {
            "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila-e2e.feature",
            "line": 52
          }
        },
        {
          "name": "Y que Tomás inició sesión en el panel del gimnasio",
          "outcome": "SUCCESS",
          "duration": 976,
          "children": [
            {
              "name": "Tomás inicia sesión como tomas.coach@udem.edu.co",
              "outcome": "SUCCESS",
              "duration": 722,
              "children": [
                {
                  "name": "Tomás navigates to \"http://localhost:5174\"",
                  "outcome": "SUCCESS",
                  "duration": 77,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:34.612Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/step-definitions/camila-e2e.steps.ts",
                    "line": 31,
                    "column": 54
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-tom-s-navigates-to--http---localho-676377ade5.png",
                      "type": "screenshot"
                    }
                  ]
                },
                {
                  "name": "Tomás enters \"tomas.coach@udem.edu.co\" into campo correo",
                  "outcome": "SUCCESS",
                  "duration": 10,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:34.748Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/tasks.ts",
                    "line": 15,
                    "column": 36
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-tom-s-enters--tomas-coach-udem-edu-00260f5368.png",
                      "type": "screenshot"
                    }
                  ]
                },
                {
                  "name": "Tomás enters \"1000000002\" into campo documento (contraseña)",
                  "outcome": "SUCCESS",
                  "duration": 56,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:34.816Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/tasks.ts",
                    "line": 16,
                    "column": 40
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-tom-s-enters--1000000002--into-cam-e79583a808.png",
                      "type": "screenshot"
                    }
                  ]
                },
                {
                  "name": "Tomás clicks on botón ingresar",
                  "outcome": "SUCCESS",
                  "duration": 360,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:34.929Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/tasks.ts",
                    "line": 17,
                    "column": 13
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-tom-s-clicks-on-bot-n-ingresar-f1f616ab89.png",
                      "type": "screenshot"
                    }
                  ]
                }
              ],
              "type": "Task",
              "startedAt": "2026-10-26T04:36:34.612Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/step-definitions/camila-e2e.steps.ts",
                "line": 31,
                "column": 54
              }
            },
            {
              "name": "Tomás abre el panel del gimnasio",
              "outcome": "SUCCESS",
              "duration": 227,
              "children": [
                {
                  "name": "Tomás waits until botón Panel does become visible",
                  "outcome": "SUCCESS",
                  "duration": 19,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:35.345Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/tasks.ts",
                    "line": 22,
                    "column": 51
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-tom-s-waits-until-bot-n-panel-does-b34df1cc14.png",
                      "type": "screenshot"
                    }
                  ]
                },
                {
                  "name": "Tomás clicks on botón Panel",
                  "outcome": "SUCCESS",
                  "duration": 58,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:35.400Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/tasks.ts",
                    "line": 22,
                    "column": 79
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-tom-s-clicks-on-bot-n-panel-251ac46ea1.png",
                      "type": "screenshot"
                    }
                  ]
                },
                {
                  "name": "Tomás waits until título del panel does become visible",
                  "outcome": "SUCCESS",
                  "duration": 21,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:35.503Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/tasks.ts",
                    "line": 22,
                    "column": 96
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-tom-s-waits-until-t-tulo-del-panel-6a25952082.png",
                      "type": "screenshot"
                    }
                  ]
                }
              ],
              "type": "Task",
              "startedAt": "2026-10-26T04:36:35.345Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/step-definitions/camila-e2e.steps.ts",
                "line": 31,
                "column": 90
              }
            }
          ],
          "type": "Task",
          "startedAt": "2026-10-26T04:36:34.607Z",
          "location": {
            "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila-e2e.feature",
            "line": 53
          }
        },
        {
          "name": "Cuando cierra la jornada y confirma",
          "outcome": "SUCCESS",
          "duration": 230,
          "children": [
            {
              "name": "Tomás ensures that the number of filas de reservas pendientes does eventually equal 1",
              "outcome": "SUCCESS",
              "duration": 13,
              "children": [],
              "type": "Interaction",
              "startedAt": "2026-10-26T04:36:35.590Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/step-definitions/camila-e2e.steps.ts",
                "line": 85,
                "column": 49
              },
              "artifacts": [
                {
                  "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-tom-s-ensures-that-the-number-of-f-dc18aaf2c5.png",
                  "type": "screenshot"
                }
              ]
            },
            {
              "name": "Tomás cierra la jornada y confirma",
              "outcome": "SUCCESS",
              "duration": 153,
              "children": [
                {
                  "name": "Tomás performs bound QuestionStatement",
                  "outcome": "SUCCESS",
                  "duration": 0,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:35.649Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/node_modules/@serenity-js/web/src/screenplay/models/dialogs/ModalDialog.ts",
                    "line": 135,
                    "column": 45
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-tom-s-accepts-next-modal-dialog-wi-bfdec50a7c.png",
                      "type": "screenshot"
                    }
                  ]
                },
                {
                  "name": "Tomás clicks on botón Cerrar jornada",
                  "outcome": "SUCCESS",
                  "duration": 75,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:35.683Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/tasks.ts",
                    "line": 47,
                    "column": 87
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-tom-s-clicks-on-bot-n-cerrar-jorna-27e7c0b05f.png",
                      "type": "screenshot"
                    }
                  ]
                }
              ],
              "type": "Task",
              "startedAt": "2026-10-26T04:36:35.649Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/step-definitions/camila-e2e.steps.ts",
                "line": 85,
                "column": 116
              }
            }
          ],
          "type": "Task",
          "startedAt": "2026-10-26T04:36:35.583Z",
          "location": {
            "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila-e2e.feature",
            "line": 54
          }
        },
        {
          "name": "Entonces el navegador debió pedir confirmación con \"Se marcarán 1 inasistencias\"",
          "outcome": "SUCCESS",
          "duration": 52,
          "children": [
            {
              "name": "Tomás ensures that last dialog message does eventually include \"Se marcarán 1 inasistencias\"",
              "outcome": "SUCCESS",
              "duration": 13,
              "children": [],
              "type": "Interaction",
              "startedAt": "2026-10-26T04:36:35.817Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/step-definitions/camila-e2e.steps.ts",
                "line": 93,
                "column": 49
              },
              "artifacts": [
                {
                  "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-tom-s-ensures-that-last-dialog-mes-b6e1ef5e33.png",
                  "type": "screenshot"
                }
              ]
            }
          ],
          "type": "Task",
          "startedAt": "2026-10-26T04:36:35.813Z",
          "location": {
            "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila-e2e.feature",
            "line": 55
          }
        },
        {
          "name": "Y debe aparecer el aviso \"Se procesaron 1 inasistencias\"",
          "outcome": "SUCCESS",
          "duration": 103,
          "children": [
            {
              "name": "Tomás waits until mensaje del aviso does become visible",
              "outcome": "SUCCESS",
              "duration": 18,
              "children": [],
              "type": "Interaction",
              "startedAt": "2026-10-26T04:36:35.867Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/step-definitions/camila-e2e.steps.ts",
                "line": 169,
                "column": 42
              },
              "artifacts": [
                {
                  "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-tom-s-waits-until-mensaje-del-avis-7651e12602.png",
                  "type": "screenshot"
                }
              ]
            },
            {
              "name": "Tomás ensures that the text of mensaje del aviso does eventually include \"Se procesaron 1 inasistencias\"",
              "outcome": "SUCCESS",
              "duration": 13,
              "children": [],
              "type": "Interaction",
              "startedAt": "2026-10-26T04:36:35.920Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/step-definitions/camila-e2e.steps.ts",
                "line": 169,
                "column": 66
              },
              "artifacts": [
                {
                  "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-tom-s-ensures-that-the-text-of-men-5bf745cdf9.png",
                  "type": "screenshot"
                }
              ]
            }
          ],
          "type": "Task",
          "startedAt": "2026-10-26T04:36:35.865Z",
          "location": {
            "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila-e2e.feature",
            "line": 56
          }
        },
        {
          "name": "Y Laura debe acumular 1 inasistencias",
          "outcome": "SUCCESS",
          "duration": 63,
          "children": [
            {
              "name": "Tomás ensures that las inasistencias acumuladas de laura.est@soyudemedellin.edu.co does eventually equal 1",
              "outcome": "SUCCESS",
              "duration": 17,
              "children": [],
              "type": "Interaction",
              "startedAt": "2026-10-26T04:36:35.970Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/step-definitions/camila-e2e.steps.ts",
                "line": 97,
                "column": 49
              },
              "artifacts": [
                {
                  "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-tom-s-ensures-that-las-inasistenci-3a21cfb13c.png",
                  "type": "screenshot"
                }
              ]
            }
          ],
          "type": "Task",
          "startedAt": "2026-10-26T04:36:35.968Z",
          "location": {
            "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila-e2e.feature",
            "line": 57
          }
        },
        {
          "name": "Y el registro diario debe mostrar 1 inasistencias",
          "outcome": "SUCCESS",
          "duration": 53,
          "children": [
            {
              "name": "Tomás ensures that the text of total de inasistencias does eventually equal \"1\"",
              "outcome": "SUCCESS",
              "duration": 14,
              "children": [],
              "type": "Interaction",
              "startedAt": "2026-10-26T04:36:36.034Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/step-definitions/camila-e2e.steps.ts",
                "line": 114,
                "column": 49
              },
              "artifacts": [
                {
                  "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-tom-s-ensures-that-the-text-of-tot-1cc693e27b.png",
                  "type": "screenshot"
                }
              ]
            }
          ],
          "type": "Task",
          "startedAt": "2026-10-26T04:36:36.032Z",
          "location": {
            "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila-e2e.feature",
            "line": 58
          }
        },
        {
          "name": "After",
          "outcome": "SUCCESS",
          "duration": 1,
          "children": [],
          "type": "Task",
          "startedAt": "2026-10-26T04:36:36.085Z",
          "location": {
            "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/actors.ts",
            "line": 52
          }
        }
      ],
      "executionHistory": [
        {
          "outcome": "SUCCESS",
          "run": "2026-10-26T04-36-24.665Z",
          "timestamp": "2026-10-26T04:36:24.312Z",
          "duration": 1819,
          "activities": [
            {
              "name": "Before",
              "outcome": "SUCCESS",
              "duration": 278,
              "children": [
                {
                  "name": "Preparador deja la base de datos sin usuarios, reservas ni mensajes",
                  "outcome": "SUCCESS",
                  "duration": 5,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:34.294Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/actors.ts",
                    "line": 47,
                    "column": 25
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-preparador-deja-la-base-de-datos-s-40ad070d69.png",
                      "type": "screenshot"
                    }
                  ]
                },
                {
                  "name": "Preparador registra la cuenta ana.admin@udemedellin.edu.co",
                  "outcome": "SUCCESS",
                  "duration": 23,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:34.381Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/actors.ts",
                    "line": 48,
                    "column": 60
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-preparador-registra-la-cuenta-ana--40ad070d69.png",
                      "type": "screenshot"
                    }
                  ]
                },
                {
                  "name": "Preparador registra la cuenta tomas.coach@udem.edu.co",
                  "outcome": "SUCCESS",
                  "duration": 23,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:34.436Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/actors.ts",
                    "line": 48,
                    "column": 60
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-preparador-registra-la-cuenta-toma-40ad070d69.png",
                      "type": "screenshot"
                    }
                  ]
                },
                {
                  "name": "Preparador registra la cuenta laura.est@soyudemedellin.edu.co",
                  "outcome": "SUCCESS",
                  "duration": 22,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:34.481Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/actors.ts",
                    "line": 48,
                    "column": 60
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-preparador-registra-la-cuenta-laur-40ad070d69.png",
                      "type": "screenshot"
                    }
                  ]
                },
                {
                  "name": "Preparador registra la cuenta mateo.est@soyudemedellin.edu.co",
                  "outcome": "SUCCESS",
                  "duration": 22,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:34.526Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/actors.ts",
                    "line": 48,
                    "column": 60
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-preparador-registra-la-cuenta-mate-40ad070d69.png",
                      "type": "screenshot"
                    }
                  ]
                }
              ],
              "type": "Task",
              "startedAt": "2026-10-26T04:36:34.292Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/actors.ts",
                "line": 33
              }
            },
            {
              "name": "Dado que Laura tiene una reserva de hoy a las 06:00",
              "outcome": "SUCCESS",
              "duration": 37,
              "children": [
                {
                  "name": "Preparador siembra una reserva de hoy a las 06:00 para laura.est@soyudemedellin.edu.co",
                  "outcome": "SUCCESS",
                  "duration": 2,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:34.570Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/step-definitions/camila-e2e.steps.ts",
                    "line": 19,
                    "column": 66
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-preparador-siembra-una-reserva-de--40ad070d69.png",
                      "type": "screenshot"
                    }
                  ]
                }
              ],
              "type": "Task",
              "startedAt": "2026-10-26T04:36:34.570Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila-e2e.feature",
                "line": 52
              }
            },
            {
              "name": "Y que Tomás inició sesión en el panel del gimnasio",
              "outcome": "SUCCESS",
              "duration": 976,
              "children": [
                {
                  "name": "Tomás inicia sesión como tomas.coach@udem.edu.co",
                  "outcome": "SUCCESS",
                  "duration": 722,
                  "children": [
                    {
                      "name": "Tomás navigates to \"http://localhost:5174\"",
                      "outcome": "SUCCESS",
                      "duration": 77,
                      "children": [],
                      "type": "Interaction",
                      "startedAt": "2026-10-26T04:36:34.612Z",
                      "location": {
                        "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/step-definitions/camila-e2e.steps.ts",
                        "line": 31,
                        "column": 54
                      },
                      "artifacts": [
                        {
                          "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-tom-s-navigates-to--http---localho-676377ade5.png",
                          "type": "screenshot"
                        }
                      ]
                    },
                    {
                      "name": "Tomás enters \"tomas.coach@udem.edu.co\" into campo correo",
                      "outcome": "SUCCESS",
                      "duration": 10,
                      "children": [],
                      "type": "Interaction",
                      "startedAt": "2026-10-26T04:36:34.748Z",
                      "location": {
                        "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/tasks.ts",
                        "line": 15,
                        "column": 36
                      },
                      "artifacts": [
                        {
                          "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-tom-s-enters--tomas-coach-udem-edu-00260f5368.png",
                          "type": "screenshot"
                        }
                      ]
                    },
                    {
                      "name": "Tomás enters \"1000000002\" into campo documento (contraseña)",
                      "outcome": "SUCCESS",
                      "duration": 56,
                      "children": [],
                      "type": "Interaction",
                      "startedAt": "2026-10-26T04:36:34.816Z",
                      "location": {
                        "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/tasks.ts",
                        "line": 16,
                        "column": 40
                      },
                      "artifacts": [
                        {
                          "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-tom-s-enters--1000000002--into-cam-e79583a808.png",
                          "type": "screenshot"
                        }
                      ]
                    },
                    {
                      "name": "Tomás clicks on botón ingresar",
                      "outcome": "SUCCESS",
                      "duration": 360,
                      "children": [],
                      "type": "Interaction",
                      "startedAt": "2026-10-26T04:36:34.929Z",
                      "location": {
                        "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/tasks.ts",
                        "line": 17,
                        "column": 13
                      },
                      "artifacts": [
                        {
                          "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-tom-s-clicks-on-bot-n-ingresar-f1f616ab89.png",
                          "type": "screenshot"
                        }
                      ]
                    }
                  ],
                  "type": "Task",
                  "startedAt": "2026-10-26T04:36:34.612Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/step-definitions/camila-e2e.steps.ts",
                    "line": 31,
                    "column": 54
                  }
                },
                {
                  "name": "Tomás abre el panel del gimnasio",
                  "outcome": "SUCCESS",
                  "duration": 227,
                  "children": [
                    {
                      "name": "Tomás waits until botón Panel does become visible",
                      "outcome": "SUCCESS",
                      "duration": 19,
                      "children": [],
                      "type": "Interaction",
                      "startedAt": "2026-10-26T04:36:35.345Z",
                      "location": {
                        "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/tasks.ts",
                        "line": 22,
                        "column": 51
                      },
                      "artifacts": [
                        {
                          "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-tom-s-waits-until-bot-n-panel-does-b34df1cc14.png",
                          "type": "screenshot"
                        }
                      ]
                    },
                    {
                      "name": "Tomás clicks on botón Panel",
                      "outcome": "SUCCESS",
                      "duration": 58,
                      "children": [],
                      "type": "Interaction",
                      "startedAt": "2026-10-26T04:36:35.400Z",
                      "location": {
                        "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/tasks.ts",
                        "line": 22,
                        "column": 79
                      },
                      "artifacts": [
                        {
                          "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-tom-s-clicks-on-bot-n-panel-251ac46ea1.png",
                          "type": "screenshot"
                        }
                      ]
                    },
                    {
                      "name": "Tomás waits until título del panel does become visible",
                      "outcome": "SUCCESS",
                      "duration": 21,
                      "children": [],
                      "type": "Interaction",
                      "startedAt": "2026-10-26T04:36:35.503Z",
                      "location": {
                        "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/tasks.ts",
                        "line": 22,
                        "column": 96
                      },
                      "artifacts": [
                        {
                          "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-tom-s-waits-until-t-tulo-del-panel-6a25952082.png",
                          "type": "screenshot"
                        }
                      ]
                    }
                  ],
                  "type": "Task",
                  "startedAt": "2026-10-26T04:36:35.345Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/step-definitions/camila-e2e.steps.ts",
                    "line": 31,
                    "column": 90
                  }
                }
              ],
              "type": "Task",
              "startedAt": "2026-10-26T04:36:34.607Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila-e2e.feature",
                "line": 53
              }
            },
            {
              "name": "Cuando cierra la jornada y confirma",
              "outcome": "SUCCESS",
              "duration": 230,
              "children": [
                {
                  "name": "Tomás ensures that the number of filas de reservas pendientes does eventually equal 1",
                  "outcome": "SUCCESS",
                  "duration": 13,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:35.590Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/step-definitions/camila-e2e.steps.ts",
                    "line": 85,
                    "column": 49
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-tom-s-ensures-that-the-number-of-f-dc18aaf2c5.png",
                      "type": "screenshot"
                    }
                  ]
                },
                {
                  "name": "Tomás cierra la jornada y confirma",
                  "outcome": "SUCCESS",
                  "duration": 153,
                  "children": [
                    {
                      "name": "Tomás performs bound QuestionStatement",
                      "outcome": "SUCCESS",
                      "duration": 0,
                      "children": [],
                      "type": "Interaction",
                      "startedAt": "2026-10-26T04:36:35.649Z",
                      "location": {
                        "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/node_modules/@serenity-js/web/src/screenplay/models/dialogs/ModalDialog.ts",
                        "line": 135,
                        "column": 45
                      },
                      "artifacts": [
                        {
                          "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-tom-s-accepts-next-modal-dialog-wi-bfdec50a7c.png",
                          "type": "screenshot"
                        }
                      ]
                    },
                    {
                      "name": "Tomás clicks on botón Cerrar jornada",
                      "outcome": "SUCCESS",
                      "duration": 75,
                      "children": [],
                      "type": "Interaction",
                      "startedAt": "2026-10-26T04:36:35.683Z",
                      "location": {
                        "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/tasks.ts",
                        "line": 47,
                        "column": 87
                      },
                      "artifacts": [
                        {
                          "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-tom-s-clicks-on-bot-n-cerrar-jorna-27e7c0b05f.png",
                          "type": "screenshot"
                        }
                      ]
                    }
                  ],
                  "type": "Task",
                  "startedAt": "2026-10-26T04:36:35.649Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/step-definitions/camila-e2e.steps.ts",
                    "line": 85,
                    "column": 116
                  }
                }
              ],
              "type": "Task",
              "startedAt": "2026-10-26T04:36:35.583Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila-e2e.feature",
                "line": 54
              }
            },
            {
              "name": "Entonces el navegador debió pedir confirmación con \"Se marcarán 1 inasistencias\"",
              "outcome": "SUCCESS",
              "duration": 52,
              "children": [
                {
                  "name": "Tomás ensures that last dialog message does eventually include \"Se marcarán 1 inasistencias\"",
                  "outcome": "SUCCESS",
                  "duration": 13,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:35.817Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/step-definitions/camila-e2e.steps.ts",
                    "line": 93,
                    "column": 49
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-tom-s-ensures-that-last-dialog-mes-b6e1ef5e33.png",
                      "type": "screenshot"
                    }
                  ]
                }
              ],
              "type": "Task",
              "startedAt": "2026-10-26T04:36:35.813Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila-e2e.feature",
                "line": 55
              }
            },
            {
              "name": "Y debe aparecer el aviso \"Se procesaron 1 inasistencias\"",
              "outcome": "SUCCESS",
              "duration": 103,
              "children": [
                {
                  "name": "Tomás waits until mensaje del aviso does become visible",
                  "outcome": "SUCCESS",
                  "duration": 18,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:35.867Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/step-definitions/camila-e2e.steps.ts",
                    "line": 169,
                    "column": 42
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-tom-s-waits-until-mensaje-del-avis-7651e12602.png",
                      "type": "screenshot"
                    }
                  ]
                },
                {
                  "name": "Tomás ensures that the text of mensaje del aviso does eventually include \"Se procesaron 1 inasistencias\"",
                  "outcome": "SUCCESS",
                  "duration": 13,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:35.920Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/step-definitions/camila-e2e.steps.ts",
                    "line": 169,
                    "column": 66
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-tom-s-ensures-that-the-text-of-men-5bf745cdf9.png",
                      "type": "screenshot"
                    }
                  ]
                }
              ],
              "type": "Task",
              "startedAt": "2026-10-26T04:36:35.865Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila-e2e.feature",
                "line": 56
              }
            },
            {
              "name": "Y Laura debe acumular 1 inasistencias",
              "outcome": "SUCCESS",
              "duration": 63,
              "children": [
                {
                  "name": "Tomás ensures that las inasistencias acumuladas de laura.est@soyudemedellin.edu.co does eventually equal 1",
                  "outcome": "SUCCESS",
                  "duration": 17,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:35.970Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/step-definitions/camila-e2e.steps.ts",
                    "line": 97,
                    "column": 49
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-tom-s-ensures-that-las-inasistenci-3a21cfb13c.png",
                      "type": "screenshot"
                    }
                  ]
                }
              ],
              "type": "Task",
              "startedAt": "2026-10-26T04:36:35.968Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila-e2e.feature",
                "line": 57
              }
            },
            {
              "name": "Y el registro diario debe mostrar 1 inasistencias",
              "outcome": "SUCCESS",
              "duration": 53,
              "children": [
                {
                  "name": "Tomás ensures that the text of total de inasistencias does eventually equal \"1\"",
                  "outcome": "SUCCESS",
                  "duration": 14,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:36.034Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/step-definitions/camila-e2e.steps.ts",
                    "line": 114,
                    "column": 49
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-tom-s-ensures-that-the-text-of-tot-1cc693e27b.png",
                      "type": "screenshot"
                    }
                  ]
                }
              ],
              "type": "Task",
              "startedAt": "2026-10-26T04:36:36.032Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila-e2e.feature",
                "line": 58
              }
            },
            {
              "name": "After",
              "outcome": "SUCCESS",
              "duration": 1,
              "children": [],
              "type": "Task",
              "startedAt": "2026-10-26T04:36:36.085Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/actors.ts",
                "line": 52
              }
            }
          ]
        }
      ],
      "narrative": "<p>Como entrenador, administradora o estudiante del gimnasio UdeM\nQuiero usar la interfaz web\nPara comprobar los requisitos RF11, RF12, RF13, RF16, RF20 y RF21</p>\n",
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
      "id": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila-e2e.feature:51"
    },
    {
      "name": "Arrepentirse de cerrar la jornada (RF13 alterno)",
      "category": "E2E de navegador - asistencia, cierre de jornada, registro diario y buzón",
      "outcome": "SUCCESS",
      "duration": 1667,
      "startedAt": "2026-10-26T04:36:36.112Z",
      "source": {
        "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila-e2e.feature",
        "line": 61
      },
      "tags": [
        {
          "type": "feature",
          "name": "E2E de navegador - asistencia, cierre de jornada, registro diario y buzón"
        },
        {
          "type": "tag",
          "name": "camila"
        },
        {
          "type": "tag",
          "name": "rf13"
        }
      ],
      "activities": [
        {
          "name": "Before",
          "outcome": "SUCCESS",
          "duration": 281,
          "children": [
            {
              "name": "Preparador deja la base de datos sin usuarios, reservas ni mensajes",
              "outcome": "SUCCESS",
              "duration": 7,
              "children": [],
              "type": "Interaction",
              "startedAt": "2026-10-26T04:36:36.115Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/actors.ts",
                "line": 47,
                "column": 25
              },
              "artifacts": [
                {
                  "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-preparador-deja-la-base-de-datos-s-40ad070d69.png",
                  "type": "screenshot"
                }
              ]
            },
            {
              "name": "Preparador registra la cuenta ana.admin@udemedellin.edu.co",
              "outcome": "SUCCESS",
              "duration": 23,
              "children": [],
              "type": "Interaction",
              "startedAt": "2026-10-26T04:36:36.190Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/actors.ts",
                "line": 48,
                "column": 60
              },
              "artifacts": [
                {
                  "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-preparador-registra-la-cuenta-ana--40ad070d69.png",
                  "type": "screenshot"
                }
              ]
            },
            {
              "name": "Preparador registra la cuenta tomas.coach@udem.edu.co",
              "outcome": "SUCCESS",
              "duration": 22,
              "children": [],
              "type": "Interaction",
              "startedAt": "2026-10-26T04:36:36.246Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/actors.ts",
                "line": 48,
                "column": 60
              },
              "artifacts": [
                {
                  "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-preparador-registra-la-cuenta-toma-40ad070d69.png",
                  "type": "screenshot"
                }
              ]
            },
            {
              "name": "Preparador registra la cuenta laura.est@soyudemedellin.edu.co",
              "outcome": "SUCCESS",
              "duration": 23,
              "children": [],
              "type": "Interaction",
              "startedAt": "2026-10-26T04:36:36.292Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/actors.ts",
                "line": 48,
                "column": 60
              },
              "artifacts": [
                {
                  "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-preparador-registra-la-cuenta-laur-40ad070d69.png",
                  "type": "screenshot"
                }
              ]
            },
            {
              "name": "Preparador registra la cuenta mateo.est@soyudemedellin.edu.co",
              "outcome": "SUCCESS",
              "duration": 23,
              "children": [],
              "type": "Interaction",
              "startedAt": "2026-10-26T04:36:36.335Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/actors.ts",
                "line": 48,
                "column": 60
              },
              "artifacts": [
                {
                  "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-preparador-registra-la-cuenta-mate-40ad070d69.png",
                  "type": "screenshot"
                }
              ]
            }
          ],
          "type": "Task",
          "startedAt": "2026-10-26T04:36:36.113Z",
          "location": {
            "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/actors.ts",
            "line": 33
          }
        },
        {
          "name": "Dado que Laura tiene una reserva de hoy a las 06:00",
          "outcome": "SUCCESS",
          "duration": 36,
          "children": [
            {
              "name": "Preparador siembra una reserva de hoy a las 06:00 para laura.est@soyudemedellin.edu.co",
              "outcome": "SUCCESS",
              "duration": 1,
              "children": [],
              "type": "Interaction",
              "startedAt": "2026-10-26T04:36:36.394Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/step-definitions/camila-e2e.steps.ts",
                "line": 19,
                "column": 66
              },
              "artifacts": [
                {
                  "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-preparador-siembra-una-reserva-de--40ad070d69.png",
                  "type": "screenshot"
                }
              ]
            }
          ],
          "type": "Task",
          "startedAt": "2026-10-26T04:36:36.394Z",
          "location": {
            "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila-e2e.feature",
            "line": 62
          }
        },
        {
          "name": "Y que Tomás inició sesión en el panel del gimnasio",
          "outcome": "SUCCESS",
          "duration": 967,
          "children": [
            {
              "name": "Tomás inicia sesión como tomas.coach@udem.edu.co",
              "outcome": "SUCCESS",
              "duration": 689,
              "children": [
                {
                  "name": "Tomás navigates to \"http://localhost:5174\"",
                  "outcome": "SUCCESS",
                  "duration": 69,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:36.436Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/step-definitions/camila-e2e.steps.ts",
                    "line": 31,
                    "column": 54
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-tom-s-navigates-to--http---localho-6b89c6c149.png",
                      "type": "screenshot"
                    }
                  ]
                },
                {
                  "name": "Tomás enters \"tomas.coach@udem.edu.co\" into campo correo",
                  "outcome": "SUCCESS",
                  "duration": 10,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:36.562Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/tasks.ts",
                    "line": 15,
                    "column": 36
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-tom-s-enters--tomas-coach-udem-edu-88837f7f81.png",
                      "type": "screenshot"
                    }
                  ]
                },
                {
                  "name": "Tomás enters \"1000000002\" into campo documento (contraseña)",
                  "outcome": "SUCCESS",
                  "duration": 57,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:36.632Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/tasks.ts",
                    "line": 16,
                    "column": 40
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-tom-s-enters--1000000002--into-cam-a6c2a3eeab.png",
                      "type": "screenshot"
                    }
                  ]
                },
                {
                  "name": "Tomás clicks on botón ingresar",
                  "outcome": "SUCCESS",
                  "duration": 355,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:36.747Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/tasks.ts",
                    "line": 17,
                    "column": 13
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-tom-s-clicks-on-bot-n-ingresar-6a403a8e5e.png",
                      "type": "screenshot"
                    }
                  ]
                }
              ],
              "type": "Task",
              "startedAt": "2026-10-26T04:36:36.436Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/step-definitions/camila-e2e.steps.ts",
                "line": 31,
                "column": 54
              }
            },
            {
              "name": "Tomás abre el panel del gimnasio",
              "outcome": "SUCCESS",
              "duration": 249,
              "children": [
                {
                  "name": "Tomás waits until botón Panel does become visible",
                  "outcome": "SUCCESS",
                  "duration": 19,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:37.137Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/tasks.ts",
                    "line": 22,
                    "column": 51
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-tom-s-waits-until-bot-n-panel-does-2d6808cf9a.png",
                      "type": "screenshot"
                    }
                  ]
                },
                {
                  "name": "Tomás clicks on botón Panel",
                  "outcome": "SUCCESS",
                  "duration": 71,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:37.205Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/tasks.ts",
                    "line": 22,
                    "column": 79
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-tom-s-clicks-on-bot-n-panel-251ac46ea1.png",
                      "type": "screenshot"
                    }
                  ]
                },
                {
                  "name": "Tomás waits until título del panel does become visible",
                  "outcome": "SUCCESS",
                  "duration": 17,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:37.321Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/tasks.ts",
                    "line": 22,
                    "column": 96
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-tom-s-waits-until-t-tulo-del-panel-6a25952082.png",
                      "type": "screenshot"
                    }
                  ]
                }
              ],
              "type": "Task",
              "startedAt": "2026-10-26T04:36:37.136Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/step-definitions/camila-e2e.steps.ts",
                "line": 31,
                "column": 90
              }
            }
          ],
          "type": "Task",
          "startedAt": "2026-10-26T04:36:36.430Z",
          "location": {
            "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila-e2e.feature",
            "line": 63
          }
        },
        {
          "name": "Cuando intenta cerrar la jornada y se arrepiente",
          "outcome": "SUCCESS",
          "duration": 229,
          "children": [
            {
              "name": "Tomás ensures that the number of filas de reservas pendientes does eventually equal 1",
              "outcome": "SUCCESS",
              "duration": 14,
              "children": [],
              "type": "Interaction",
              "startedAt": "2026-10-26T04:36:37.402Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/step-definitions/camila-e2e.steps.ts",
                "line": 89,
                "column": 49
              },
              "artifacts": [
                {
                  "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-tom-s-ensures-that-the-number-of-f-05526f7927.png",
                  "type": "screenshot"
                }
              ]
            },
            {
              "name": "Tomás intenta cerrar la jornada y se arrepiente",
              "outcome": "SUCCESS",
              "duration": 166,
              "children": [
                {
                  "name": "Tomás performs bound QuestionStatement",
                  "outcome": "SUCCESS",
                  "duration": 1,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:37.449Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/node_modules/@serenity-js/web/src/screenplay/models/dialogs/ModalDialog.ts",
                    "line": 153,
                    "column": 45
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-tom-s-dismisses-next-modal-dialog--22026b2a28.png",
                      "type": "screenshot"
                    }
                  ]
                },
                {
                  "name": "Tomás clicks on botón Cerrar jornada",
                  "outcome": "SUCCESS",
                  "duration": 96,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:37.484Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/tasks.ts",
                    "line": 49,
                    "column": 101
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-tom-s-clicks-on-bot-n-cerrar-jorna-26f6885e4c.png",
                      "type": "screenshot"
                    }
                  ]
                }
              ],
              "type": "Task",
              "startedAt": "2026-10-26T04:36:37.449Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/step-definitions/camila-e2e.steps.ts",
                "line": 89,
                "column": 116
              }
            }
          ],
          "type": "Task",
          "startedAt": "2026-10-26T04:36:37.398Z",
          "location": {
            "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila-e2e.feature",
            "line": 64
          }
        },
        {
          "name": "Entonces debe ver 1 reservas sin asistencia",
          "outcome": "SUCCESS",
          "duration": 62,
          "children": [
            {
              "name": "Tomás ensures that the number of filas de reservas pendientes does eventually equal 1",
              "outcome": "SUCCESS",
              "duration": 13,
              "children": [],
              "type": "Interaction",
              "startedAt": "2026-10-26T04:36:37.629Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/step-definitions/camila-e2e.steps.ts",
                "line": 64,
                "column": 49
              },
              "artifacts": [
                {
                  "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-tom-s-ensures-that-the-number-of-f-a7a42c0d73.png",
                  "type": "screenshot"
                }
              ]
            }
          ],
          "type": "Task",
          "startedAt": "2026-10-26T04:36:37.627Z",
          "location": {
            "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila-e2e.feature",
            "line": 65
          }
        },
        {
          "name": "Y Laura debe acumular 0 inasistencias",
          "outcome": "SUCCESS",
          "duration": 65,
          "children": [
            {
              "name": "Tomás ensures that las inasistencias acumuladas de laura.est@soyudemedellin.edu.co does eventually equal 0",
              "outcome": "SUCCESS",
              "duration": 18,
              "children": [],
              "type": "Interaction",
              "startedAt": "2026-10-26T04:36:37.690Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/step-definitions/camila-e2e.steps.ts",
                "line": 97,
                "column": 49
              },
              "artifacts": [
                {
                  "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-tom-s-ensures-that-las-inasistenci-a598dba0ec.png",
                  "type": "screenshot"
                }
              ]
            }
          ],
          "type": "Task",
          "startedAt": "2026-10-26T04:36:37.689Z",
          "location": {
            "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila-e2e.feature",
            "line": 66
          }
        },
        {
          "name": "After",
          "outcome": "SUCCESS",
          "duration": 1,
          "children": [],
          "type": "Task",
          "startedAt": "2026-10-26T04:36:37.755Z",
          "location": {
            "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/actors.ts",
            "line": 52
          }
        }
      ],
      "executionHistory": [
        {
          "outcome": "SUCCESS",
          "run": "2026-10-26T04-36-24.665Z",
          "timestamp": "2026-10-26T04:36:24.312Z",
          "duration": 1667,
          "activities": [
            {
              "name": "Before",
              "outcome": "SUCCESS",
              "duration": 281,
              "children": [
                {
                  "name": "Preparador deja la base de datos sin usuarios, reservas ni mensajes",
                  "outcome": "SUCCESS",
                  "duration": 7,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:36.115Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/actors.ts",
                    "line": 47,
                    "column": 25
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-preparador-deja-la-base-de-datos-s-40ad070d69.png",
                      "type": "screenshot"
                    }
                  ]
                },
                {
                  "name": "Preparador registra la cuenta ana.admin@udemedellin.edu.co",
                  "outcome": "SUCCESS",
                  "duration": 23,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:36.190Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/actors.ts",
                    "line": 48,
                    "column": 60
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-preparador-registra-la-cuenta-ana--40ad070d69.png",
                      "type": "screenshot"
                    }
                  ]
                },
                {
                  "name": "Preparador registra la cuenta tomas.coach@udem.edu.co",
                  "outcome": "SUCCESS",
                  "duration": 22,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:36.246Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/actors.ts",
                    "line": 48,
                    "column": 60
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-preparador-registra-la-cuenta-toma-40ad070d69.png",
                      "type": "screenshot"
                    }
                  ]
                },
                {
                  "name": "Preparador registra la cuenta laura.est@soyudemedellin.edu.co",
                  "outcome": "SUCCESS",
                  "duration": 23,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:36.292Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/actors.ts",
                    "line": 48,
                    "column": 60
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-preparador-registra-la-cuenta-laur-40ad070d69.png",
                      "type": "screenshot"
                    }
                  ]
                },
                {
                  "name": "Preparador registra la cuenta mateo.est@soyudemedellin.edu.co",
                  "outcome": "SUCCESS",
                  "duration": 23,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:36.335Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/actors.ts",
                    "line": 48,
                    "column": 60
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-preparador-registra-la-cuenta-mate-40ad070d69.png",
                      "type": "screenshot"
                    }
                  ]
                }
              ],
              "type": "Task",
              "startedAt": "2026-10-26T04:36:36.113Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/actors.ts",
                "line": 33
              }
            },
            {
              "name": "Dado que Laura tiene una reserva de hoy a las 06:00",
              "outcome": "SUCCESS",
              "duration": 36,
              "children": [
                {
                  "name": "Preparador siembra una reserva de hoy a las 06:00 para laura.est@soyudemedellin.edu.co",
                  "outcome": "SUCCESS",
                  "duration": 1,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:36.394Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/step-definitions/camila-e2e.steps.ts",
                    "line": 19,
                    "column": 66
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-preparador-siembra-una-reserva-de--40ad070d69.png",
                      "type": "screenshot"
                    }
                  ]
                }
              ],
              "type": "Task",
              "startedAt": "2026-10-26T04:36:36.394Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila-e2e.feature",
                "line": 62
              }
            },
            {
              "name": "Y que Tomás inició sesión en el panel del gimnasio",
              "outcome": "SUCCESS",
              "duration": 967,
              "children": [
                {
                  "name": "Tomás inicia sesión como tomas.coach@udem.edu.co",
                  "outcome": "SUCCESS",
                  "duration": 689,
                  "children": [
                    {
                      "name": "Tomás navigates to \"http://localhost:5174\"",
                      "outcome": "SUCCESS",
                      "duration": 69,
                      "children": [],
                      "type": "Interaction",
                      "startedAt": "2026-10-26T04:36:36.436Z",
                      "location": {
                        "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/step-definitions/camila-e2e.steps.ts",
                        "line": 31,
                        "column": 54
                      },
                      "artifacts": [
                        {
                          "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-tom-s-navigates-to--http---localho-6b89c6c149.png",
                          "type": "screenshot"
                        }
                      ]
                    },
                    {
                      "name": "Tomás enters \"tomas.coach@udem.edu.co\" into campo correo",
                      "outcome": "SUCCESS",
                      "duration": 10,
                      "children": [],
                      "type": "Interaction",
                      "startedAt": "2026-10-26T04:36:36.562Z",
                      "location": {
                        "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/tasks.ts",
                        "line": 15,
                        "column": 36
                      },
                      "artifacts": [
                        {
                          "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-tom-s-enters--tomas-coach-udem-edu-88837f7f81.png",
                          "type": "screenshot"
                        }
                      ]
                    },
                    {
                      "name": "Tomás enters \"1000000002\" into campo documento (contraseña)",
                      "outcome": "SUCCESS",
                      "duration": 57,
                      "children": [],
                      "type": "Interaction",
                      "startedAt": "2026-10-26T04:36:36.632Z",
                      "location": {
                        "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/tasks.ts",
                        "line": 16,
                        "column": 40
                      },
                      "artifacts": [
                        {
                          "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-tom-s-enters--1000000002--into-cam-a6c2a3eeab.png",
                          "type": "screenshot"
                        }
                      ]
                    },
                    {
                      "name": "Tomás clicks on botón ingresar",
                      "outcome": "SUCCESS",
                      "duration": 355,
                      "children": [],
                      "type": "Interaction",
                      "startedAt": "2026-10-26T04:36:36.747Z",
                      "location": {
                        "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/tasks.ts",
                        "line": 17,
                        "column": 13
                      },
                      "artifacts": [
                        {
                          "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-tom-s-clicks-on-bot-n-ingresar-6a403a8e5e.png",
                          "type": "screenshot"
                        }
                      ]
                    }
                  ],
                  "type": "Task",
                  "startedAt": "2026-10-26T04:36:36.436Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/step-definitions/camila-e2e.steps.ts",
                    "line": 31,
                    "column": 54
                  }
                },
                {
                  "name": "Tomás abre el panel del gimnasio",
                  "outcome": "SUCCESS",
                  "duration": 249,
                  "children": [
                    {
                      "name": "Tomás waits until botón Panel does become visible",
                      "outcome": "SUCCESS",
                      "duration": 19,
                      "children": [],
                      "type": "Interaction",
                      "startedAt": "2026-10-26T04:36:37.137Z",
                      "location": {
                        "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/tasks.ts",
                        "line": 22,
                        "column": 51
                      },
                      "artifacts": [
                        {
                          "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-tom-s-waits-until-bot-n-panel-does-2d6808cf9a.png",
                          "type": "screenshot"
                        }
                      ]
                    },
                    {
                      "name": "Tomás clicks on botón Panel",
                      "outcome": "SUCCESS",
                      "duration": 71,
                      "children": [],
                      "type": "Interaction",
                      "startedAt": "2026-10-26T04:36:37.205Z",
                      "location": {
                        "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/tasks.ts",
                        "line": 22,
                        "column": 79
                      },
                      "artifacts": [
                        {
                          "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-tom-s-clicks-on-bot-n-panel-251ac46ea1.png",
                          "type": "screenshot"
                        }
                      ]
                    },
                    {
                      "name": "Tomás waits until título del panel does become visible",
                      "outcome": "SUCCESS",
                      "duration": 17,
                      "children": [],
                      "type": "Interaction",
                      "startedAt": "2026-10-26T04:36:37.321Z",
                      "location": {
                        "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/tasks.ts",
                        "line": 22,
                        "column": 96
                      },
                      "artifacts": [
                        {
                          "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-tom-s-waits-until-t-tulo-del-panel-6a25952082.png",
                          "type": "screenshot"
                        }
                      ]
                    }
                  ],
                  "type": "Task",
                  "startedAt": "2026-10-26T04:36:37.136Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/step-definitions/camila-e2e.steps.ts",
                    "line": 31,
                    "column": 90
                  }
                }
              ],
              "type": "Task",
              "startedAt": "2026-10-26T04:36:36.430Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila-e2e.feature",
                "line": 63
              }
            },
            {
              "name": "Cuando intenta cerrar la jornada y se arrepiente",
              "outcome": "SUCCESS",
              "duration": 229,
              "children": [
                {
                  "name": "Tomás ensures that the number of filas de reservas pendientes does eventually equal 1",
                  "outcome": "SUCCESS",
                  "duration": 14,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:37.402Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/step-definitions/camila-e2e.steps.ts",
                    "line": 89,
                    "column": 49
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-tom-s-ensures-that-the-number-of-f-05526f7927.png",
                      "type": "screenshot"
                    }
                  ]
                },
                {
                  "name": "Tomás intenta cerrar la jornada y se arrepiente",
                  "outcome": "SUCCESS",
                  "duration": 166,
                  "children": [
                    {
                      "name": "Tomás performs bound QuestionStatement",
                      "outcome": "SUCCESS",
                      "duration": 1,
                      "children": [],
                      "type": "Interaction",
                      "startedAt": "2026-10-26T04:36:37.449Z",
                      "location": {
                        "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/node_modules/@serenity-js/web/src/screenplay/models/dialogs/ModalDialog.ts",
                        "line": 153,
                        "column": 45
                      },
                      "artifacts": [
                        {
                          "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-tom-s-dismisses-next-modal-dialog--22026b2a28.png",
                          "type": "screenshot"
                        }
                      ]
                    },
                    {
                      "name": "Tomás clicks on botón Cerrar jornada",
                      "outcome": "SUCCESS",
                      "duration": 96,
                      "children": [],
                      "type": "Interaction",
                      "startedAt": "2026-10-26T04:36:37.484Z",
                      "location": {
                        "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/tasks.ts",
                        "line": 49,
                        "column": 101
                      },
                      "artifacts": [
                        {
                          "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-tom-s-clicks-on-bot-n-cerrar-jorna-26f6885e4c.png",
                          "type": "screenshot"
                        }
                      ]
                    }
                  ],
                  "type": "Task",
                  "startedAt": "2026-10-26T04:36:37.449Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/step-definitions/camila-e2e.steps.ts",
                    "line": 89,
                    "column": 116
                  }
                }
              ],
              "type": "Task",
              "startedAt": "2026-10-26T04:36:37.398Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila-e2e.feature",
                "line": 64
              }
            },
            {
              "name": "Entonces debe ver 1 reservas sin asistencia",
              "outcome": "SUCCESS",
              "duration": 62,
              "children": [
                {
                  "name": "Tomás ensures that the number of filas de reservas pendientes does eventually equal 1",
                  "outcome": "SUCCESS",
                  "duration": 13,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:37.629Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/step-definitions/camila-e2e.steps.ts",
                    "line": 64,
                    "column": 49
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-tom-s-ensures-that-the-number-of-f-a7a42c0d73.png",
                      "type": "screenshot"
                    }
                  ]
                }
              ],
              "type": "Task",
              "startedAt": "2026-10-26T04:36:37.627Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila-e2e.feature",
                "line": 65
              }
            },
            {
              "name": "Y Laura debe acumular 0 inasistencias",
              "outcome": "SUCCESS",
              "duration": 65,
              "children": [
                {
                  "name": "Tomás ensures that las inasistencias acumuladas de laura.est@soyudemedellin.edu.co does eventually equal 0",
                  "outcome": "SUCCESS",
                  "duration": 18,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:37.690Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/step-definitions/camila-e2e.steps.ts",
                    "line": 97,
                    "column": 49
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-tom-s-ensures-that-las-inasistenci-a598dba0ec.png",
                      "type": "screenshot"
                    }
                  ]
                }
              ],
              "type": "Task",
              "startedAt": "2026-10-26T04:36:37.689Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila-e2e.feature",
                "line": 66
              }
            },
            {
              "name": "After",
              "outcome": "SUCCESS",
              "duration": 1,
              "children": [],
              "type": "Task",
              "startedAt": "2026-10-26T04:36:37.755Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/actors.ts",
                "line": 52
              }
            }
          ]
        }
      ],
      "narrative": "<p>Como entrenador, administradora o estudiante del gimnasio UdeM\nQuiero usar la interfaz web\nPara comprobar los requisitos RF11, RF12, RF13, RF16, RF20 y RF21</p>\n",
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
      "id": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila-e2e.feature:61"
    },
    {
      "name": "La administradora ve los pendientes pero no cierra la jornada (RF13 error de permisos)",
      "category": "E2E de navegador - asistencia, cierre de jornada, registro diario y buzón",
      "outcome": "SUCCESS",
      "duration": 1726,
      "startedAt": "2026-10-26T04:36:37.781Z",
      "source": {
        "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila-e2e.feature",
        "line": 69
      },
      "tags": [
        {
          "type": "feature",
          "name": "E2E de navegador - asistencia, cierre de jornada, registro diario y buzón"
        },
        {
          "type": "tag",
          "name": "camila"
        },
        {
          "type": "tag",
          "name": "rf13"
        }
      ],
      "activities": [
        {
          "name": "Before",
          "outcome": "SUCCESS",
          "duration": 277,
          "children": [
            {
              "name": "Preparador deja la base de datos sin usuarios, reservas ni mensajes",
              "outcome": "SUCCESS",
              "duration": 6,
              "children": [],
              "type": "Interaction",
              "startedAt": "2026-10-26T04:36:37.783Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/actors.ts",
                "line": 47,
                "column": 25
              },
              "artifacts": [
                {
                  "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-preparador-deja-la-base-de-datos-s-40ad070d69.png",
                  "type": "screenshot"
                }
              ]
            },
            {
              "name": "Preparador registra la cuenta ana.admin@udemedellin.edu.co",
              "outcome": "SUCCESS",
              "duration": 23,
              "children": [],
              "type": "Interaction",
              "startedAt": "2026-10-26T04:36:37.858Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/actors.ts",
                "line": 48,
                "column": 60
              },
              "artifacts": [
                {
                  "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-preparador-registra-la-cuenta-ana--40ad070d69.png",
                  "type": "screenshot"
                }
              ]
            },
            {
              "name": "Preparador registra la cuenta tomas.coach@udem.edu.co",
              "outcome": "SUCCESS",
              "duration": 22,
              "children": [],
              "type": "Interaction",
              "startedAt": "2026-10-26T04:36:37.913Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/actors.ts",
                "line": 48,
                "column": 60
              },
              "artifacts": [
                {
                  "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-preparador-registra-la-cuenta-toma-40ad070d69.png",
                  "type": "screenshot"
                }
              ]
            },
            {
              "name": "Preparador registra la cuenta laura.est@soyudemedellin.edu.co",
              "outcome": "SUCCESS",
              "duration": 22,
              "children": [],
              "type": "Interaction",
              "startedAt": "2026-10-26T04:36:37.956Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/actors.ts",
                "line": 48,
                "column": 60
              },
              "artifacts": [
                {
                  "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-preparador-registra-la-cuenta-laur-40ad070d69.png",
                  "type": "screenshot"
                }
              ]
            },
            {
              "name": "Preparador registra la cuenta mateo.est@soyudemedellin.edu.co",
              "outcome": "SUCCESS",
              "duration": 24,
              "children": [],
              "type": "Interaction",
              "startedAt": "2026-10-26T04:36:38.012Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/actors.ts",
                "line": 48,
                "column": 60
              },
              "artifacts": [
                {
                  "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-preparador-registra-la-cuenta-mate-40ad070d69.png",
                  "type": "screenshot"
                }
              ]
            }
          ],
          "type": "Task",
          "startedAt": "2026-10-26T04:36:37.781Z",
          "location": {
            "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/actors.ts",
            "line": 33
          }
        },
        {
          "name": "Dado que Laura tiene una reserva de hoy a las 06:00",
          "outcome": "SUCCESS",
          "duration": 37,
          "children": [
            {
              "name": "Preparador siembra una reserva de hoy a las 06:00 para laura.est@soyudemedellin.edu.co",
              "outcome": "SUCCESS",
              "duration": 2,
              "children": [],
              "type": "Interaction",
              "startedAt": "2026-10-26T04:36:38.059Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/step-definitions/camila-e2e.steps.ts",
                "line": 19,
                "column": 66
              },
              "artifacts": [
                {
                  "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-preparador-siembra-una-reserva-de--40ad070d69.png",
                  "type": "screenshot"
                }
              ]
            }
          ],
          "type": "Task",
          "startedAt": "2026-10-26T04:36:38.059Z",
          "location": {
            "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila-e2e.feature",
            "line": 70
          }
        },
        {
          "name": "Y que Ana inició sesión en el panel del gimnasio",
          "outcome": "SUCCESS",
          "duration": 970,
          "children": [
            {
              "name": "Ana inicia sesión como ana.admin@udemedellin.edu.co",
              "outcome": "SUCCESS",
              "duration": 716,
              "children": [
                {
                  "name": "Ana navigates to \"http://localhost:5174\"",
                  "outcome": "SUCCESS",
                  "duration": 71,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:38.102Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/step-definitions/camila-e2e.steps.ts",
                    "line": 31,
                    "column": 54
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-ana-navigates-to--http---localhost-676377ade5.png",
                      "type": "screenshot"
                    }
                  ]
                },
                {
                  "name": "Ana enters \"ana.admin@udemedellin.edu.co\" into campo correo",
                  "outcome": "SUCCESS",
                  "duration": 9,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:38.228Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/tasks.ts",
                    "line": 15,
                    "column": 36
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-ana-enters--ana-admin-udemedellin--cd4fed1973.png",
                      "type": "screenshot"
                    }
                  ]
                },
                {
                  "name": "Ana enters \"1000000001\" into campo documento (contraseña)",
                  "outcome": "SUCCESS",
                  "duration": 70,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:38.284Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/tasks.ts",
                    "line": 16,
                    "column": 40
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-ana-enters--1000000001--into-campo-d27da054bd.png",
                      "type": "screenshot"
                    }
                  ]
                },
                {
                  "name": "Ana clicks on botón ingresar",
                  "outcome": "SUCCESS",
                  "duration": 359,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:38.415Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/tasks.ts",
                    "line": 17,
                    "column": 13
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-ana-clicks-on-bot-n-ingresar-1780fa4783.png",
                      "type": "screenshot"
                    }
                  ]
                }
              ],
              "type": "Task",
              "startedAt": "2026-10-26T04:36:38.102Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/step-definitions/camila-e2e.steps.ts",
                "line": 31,
                "column": 54
              }
            },
            {
              "name": "Ana abre el panel del gimnasio",
              "outcome": "SUCCESS",
              "duration": 224,
              "children": [
                {
                  "name": "Ana waits until botón Panel does become visible",
                  "outcome": "SUCCESS",
                  "duration": 18,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:38.830Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/tasks.ts",
                    "line": 22,
                    "column": 51
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-ana-waits-until-bot-n-panel-does-b-ee925de97d.png",
                      "type": "screenshot"
                    }
                  ]
                },
                {
                  "name": "Ana clicks on botón Panel",
                  "outcome": "SUCCESS",
                  "duration": 58,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:38.883Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/tasks.ts",
                    "line": 22,
                    "column": 79
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-ana-clicks-on-bot-n-panel-8a54319250.png",
                      "type": "screenshot"
                    }
                  ]
                },
                {
                  "name": "Ana waits until título del panel does become visible",
                  "outcome": "SUCCESS",
                  "duration": 20,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:38.988Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/tasks.ts",
                    "line": 22,
                    "column": 96
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-ana-waits-until-t-tulo-del-panel-d-29000de309.png",
                      "type": "screenshot"
                    }
                  ]
                }
              ],
              "type": "Task",
              "startedAt": "2026-10-26T04:36:38.830Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/step-definitions/camila-e2e.steps.ts",
                "line": 31,
                "column": 90
              }
            }
          ],
          "type": "Task",
          "startedAt": "2026-10-26T04:36:38.096Z",
          "location": {
            "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila-e2e.feature",
            "line": 71
          }
        },
        {
          "name": "Entonces debe ver 1 reservas sin asistencia",
          "outcome": "SUCCESS",
          "duration": 51,
          "children": [
            {
              "name": "Ana ensures that the number of filas de reservas pendientes does eventually equal 1",
              "outcome": "SUCCESS",
              "duration": 14,
              "children": [],
              "type": "Interaction",
              "startedAt": "2026-10-26T04:36:39.068Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/step-definitions/camila-e2e.steps.ts",
                "line": 64,
                "column": 49
              },
              "artifacts": [
                {
                  "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-ana-ensures-that-the-number-of-fil-68dc2f734c.png",
                  "type": "screenshot"
                }
              ]
            }
          ],
          "type": "Task",
          "startedAt": "2026-10-26T04:36:39.066Z",
          "location": {
            "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila-e2e.feature",
            "line": 72
          }
        },
        {
          "name": "Y debe ver la nota \"Solo el entrenador cierra la jornada\"",
          "outcome": "SUCCESS",
          "duration": 51,
          "children": [
            {
              "name": "Ana ensures that the text of nota sobre quién cierra la jornada does eventually include \"Solo el entrenador cierra la jornada\"",
              "outcome": "SUCCESS",
              "duration": 15,
              "children": [],
              "type": "Interaction",
              "startedAt": "2026-10-26T04:36:39.119Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/step-definitions/camila-e2e.steps.ts",
                "line": 101,
                "column": 49
              },
              "artifacts": [
                {
                  "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-ana-ensures-that-the-text-of-nota--e36b46f565.png",
                  "type": "screenshot"
                }
              ]
            }
          ],
          "type": "Task",
          "startedAt": "2026-10-26T04:36:39.117Z",
          "location": {
            "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila-e2e.feature",
            "line": 73
          }
        },
        {
          "name": "Y no debe ver el botón para cerrar la jornada",
          "outcome": "SUCCESS",
          "duration": 313,
          "children": [
            {
              "name": "Ana ensures that botón Cerrar jornada does not become present",
              "outcome": "SUCCESS",
              "duration": 253,
              "children": [],
              "type": "Interaction",
              "startedAt": "2026-10-26T04:36:39.169Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/step-definitions/camila-e2e.steps.ts",
                "line": 105,
                "column": 49
              },
              "artifacts": [
                {
                  "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-ana-ensures-that-bot-n-cerrar-jorn-2cfb10f318.png",
                  "type": "screenshot"
                }
              ]
            }
          ],
          "type": "Task",
          "startedAt": "2026-10-26T04:36:39.168Z",
          "location": {
            "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila-e2e.feature",
            "line": 74
          }
        },
        {
          "name": "After",
          "outcome": "SUCCESS",
          "duration": 1,
          "children": [],
          "type": "Task",
          "startedAt": "2026-10-26T04:36:39.481Z",
          "location": {
            "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/actors.ts",
            "line": 52
          }
        }
      ],
      "executionHistory": [
        {
          "outcome": "SUCCESS",
          "run": "2026-10-26T04-36-24.665Z",
          "timestamp": "2026-10-26T04:36:24.312Z",
          "duration": 1726,
          "activities": [
            {
              "name": "Before",
              "outcome": "SUCCESS",
              "duration": 277,
              "children": [
                {
                  "name": "Preparador deja la base de datos sin usuarios, reservas ni mensajes",
                  "outcome": "SUCCESS",
                  "duration": 6,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:37.783Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/actors.ts",
                    "line": 47,
                    "column": 25
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-preparador-deja-la-base-de-datos-s-40ad070d69.png",
                      "type": "screenshot"
                    }
                  ]
                },
                {
                  "name": "Preparador registra la cuenta ana.admin@udemedellin.edu.co",
                  "outcome": "SUCCESS",
                  "duration": 23,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:37.858Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/actors.ts",
                    "line": 48,
                    "column": 60
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-preparador-registra-la-cuenta-ana--40ad070d69.png",
                      "type": "screenshot"
                    }
                  ]
                },
                {
                  "name": "Preparador registra la cuenta tomas.coach@udem.edu.co",
                  "outcome": "SUCCESS",
                  "duration": 22,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:37.913Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/actors.ts",
                    "line": 48,
                    "column": 60
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-preparador-registra-la-cuenta-toma-40ad070d69.png",
                      "type": "screenshot"
                    }
                  ]
                },
                {
                  "name": "Preparador registra la cuenta laura.est@soyudemedellin.edu.co",
                  "outcome": "SUCCESS",
                  "duration": 22,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:37.956Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/actors.ts",
                    "line": 48,
                    "column": 60
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-preparador-registra-la-cuenta-laur-40ad070d69.png",
                      "type": "screenshot"
                    }
                  ]
                },
                {
                  "name": "Preparador registra la cuenta mateo.est@soyudemedellin.edu.co",
                  "outcome": "SUCCESS",
                  "duration": 24,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:38.012Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/actors.ts",
                    "line": 48,
                    "column": 60
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-preparador-registra-la-cuenta-mate-40ad070d69.png",
                      "type": "screenshot"
                    }
                  ]
                }
              ],
              "type": "Task",
              "startedAt": "2026-10-26T04:36:37.781Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/actors.ts",
                "line": 33
              }
            },
            {
              "name": "Dado que Laura tiene una reserva de hoy a las 06:00",
              "outcome": "SUCCESS",
              "duration": 37,
              "children": [
                {
                  "name": "Preparador siembra una reserva de hoy a las 06:00 para laura.est@soyudemedellin.edu.co",
                  "outcome": "SUCCESS",
                  "duration": 2,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:38.059Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/step-definitions/camila-e2e.steps.ts",
                    "line": 19,
                    "column": 66
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-preparador-siembra-una-reserva-de--40ad070d69.png",
                      "type": "screenshot"
                    }
                  ]
                }
              ],
              "type": "Task",
              "startedAt": "2026-10-26T04:36:38.059Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila-e2e.feature",
                "line": 70
              }
            },
            {
              "name": "Y que Ana inició sesión en el panel del gimnasio",
              "outcome": "SUCCESS",
              "duration": 970,
              "children": [
                {
                  "name": "Ana inicia sesión como ana.admin@udemedellin.edu.co",
                  "outcome": "SUCCESS",
                  "duration": 716,
                  "children": [
                    {
                      "name": "Ana navigates to \"http://localhost:5174\"",
                      "outcome": "SUCCESS",
                      "duration": 71,
                      "children": [],
                      "type": "Interaction",
                      "startedAt": "2026-10-26T04:36:38.102Z",
                      "location": {
                        "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/step-definitions/camila-e2e.steps.ts",
                        "line": 31,
                        "column": 54
                      },
                      "artifacts": [
                        {
                          "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-ana-navigates-to--http---localhost-676377ade5.png",
                          "type": "screenshot"
                        }
                      ]
                    },
                    {
                      "name": "Ana enters \"ana.admin@udemedellin.edu.co\" into campo correo",
                      "outcome": "SUCCESS",
                      "duration": 9,
                      "children": [],
                      "type": "Interaction",
                      "startedAt": "2026-10-26T04:36:38.228Z",
                      "location": {
                        "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/tasks.ts",
                        "line": 15,
                        "column": 36
                      },
                      "artifacts": [
                        {
                          "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-ana-enters--ana-admin-udemedellin--cd4fed1973.png",
                          "type": "screenshot"
                        }
                      ]
                    },
                    {
                      "name": "Ana enters \"1000000001\" into campo documento (contraseña)",
                      "outcome": "SUCCESS",
                      "duration": 70,
                      "children": [],
                      "type": "Interaction",
                      "startedAt": "2026-10-26T04:36:38.284Z",
                      "location": {
                        "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/tasks.ts",
                        "line": 16,
                        "column": 40
                      },
                      "artifacts": [
                        {
                          "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-ana-enters--1000000001--into-campo-d27da054bd.png",
                          "type": "screenshot"
                        }
                      ]
                    },
                    {
                      "name": "Ana clicks on botón ingresar",
                      "outcome": "SUCCESS",
                      "duration": 359,
                      "children": [],
                      "type": "Interaction",
                      "startedAt": "2026-10-26T04:36:38.415Z",
                      "location": {
                        "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/tasks.ts",
                        "line": 17,
                        "column": 13
                      },
                      "artifacts": [
                        {
                          "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-ana-clicks-on-bot-n-ingresar-1780fa4783.png",
                          "type": "screenshot"
                        }
                      ]
                    }
                  ],
                  "type": "Task",
                  "startedAt": "2026-10-26T04:36:38.102Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/step-definitions/camila-e2e.steps.ts",
                    "line": 31,
                    "column": 54
                  }
                },
                {
                  "name": "Ana abre el panel del gimnasio",
                  "outcome": "SUCCESS",
                  "duration": 224,
                  "children": [
                    {
                      "name": "Ana waits until botón Panel does become visible",
                      "outcome": "SUCCESS",
                      "duration": 18,
                      "children": [],
                      "type": "Interaction",
                      "startedAt": "2026-10-26T04:36:38.830Z",
                      "location": {
                        "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/tasks.ts",
                        "line": 22,
                        "column": 51
                      },
                      "artifacts": [
                        {
                          "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-ana-waits-until-bot-n-panel-does-b-ee925de97d.png",
                          "type": "screenshot"
                        }
                      ]
                    },
                    {
                      "name": "Ana clicks on botón Panel",
                      "outcome": "SUCCESS",
                      "duration": 58,
                      "children": [],
                      "type": "Interaction",
                      "startedAt": "2026-10-26T04:36:38.883Z",
                      "location": {
                        "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/tasks.ts",
                        "line": 22,
                        "column": 79
                      },
                      "artifacts": [
                        {
                          "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-ana-clicks-on-bot-n-panel-8a54319250.png",
                          "type": "screenshot"
                        }
                      ]
                    },
                    {
                      "name": "Ana waits until título del panel does become visible",
                      "outcome": "SUCCESS",
                      "duration": 20,
                      "children": [],
                      "type": "Interaction",
                      "startedAt": "2026-10-26T04:36:38.988Z",
                      "location": {
                        "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/tasks.ts",
                        "line": 22,
                        "column": 96
                      },
                      "artifacts": [
                        {
                          "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-ana-waits-until-t-tulo-del-panel-d-29000de309.png",
                          "type": "screenshot"
                        }
                      ]
                    }
                  ],
                  "type": "Task",
                  "startedAt": "2026-10-26T04:36:38.830Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/step-definitions/camila-e2e.steps.ts",
                    "line": 31,
                    "column": 90
                  }
                }
              ],
              "type": "Task",
              "startedAt": "2026-10-26T04:36:38.096Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila-e2e.feature",
                "line": 71
              }
            },
            {
              "name": "Entonces debe ver 1 reservas sin asistencia",
              "outcome": "SUCCESS",
              "duration": 51,
              "children": [
                {
                  "name": "Ana ensures that the number of filas de reservas pendientes does eventually equal 1",
                  "outcome": "SUCCESS",
                  "duration": 14,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:39.068Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/step-definitions/camila-e2e.steps.ts",
                    "line": 64,
                    "column": 49
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-ana-ensures-that-the-number-of-fil-68dc2f734c.png",
                      "type": "screenshot"
                    }
                  ]
                }
              ],
              "type": "Task",
              "startedAt": "2026-10-26T04:36:39.066Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila-e2e.feature",
                "line": 72
              }
            },
            {
              "name": "Y debe ver la nota \"Solo el entrenador cierra la jornada\"",
              "outcome": "SUCCESS",
              "duration": 51,
              "children": [
                {
                  "name": "Ana ensures that the text of nota sobre quién cierra la jornada does eventually include \"Solo el entrenador cierra la jornada\"",
                  "outcome": "SUCCESS",
                  "duration": 15,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:39.119Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/step-definitions/camila-e2e.steps.ts",
                    "line": 101,
                    "column": 49
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-ana-ensures-that-the-text-of-nota--e36b46f565.png",
                      "type": "screenshot"
                    }
                  ]
                }
              ],
              "type": "Task",
              "startedAt": "2026-10-26T04:36:39.117Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila-e2e.feature",
                "line": 73
              }
            },
            {
              "name": "Y no debe ver el botón para cerrar la jornada",
              "outcome": "SUCCESS",
              "duration": 313,
              "children": [
                {
                  "name": "Ana ensures that botón Cerrar jornada does not become present",
                  "outcome": "SUCCESS",
                  "duration": 253,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:39.169Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/step-definitions/camila-e2e.steps.ts",
                    "line": 105,
                    "column": 49
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-ana-ensures-that-bot-n-cerrar-jorn-2cfb10f318.png",
                      "type": "screenshot"
                    }
                  ]
                }
              ],
              "type": "Task",
              "startedAt": "2026-10-26T04:36:39.168Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila-e2e.feature",
                "line": 74
              }
            },
            {
              "name": "After",
              "outcome": "SUCCESS",
              "duration": 1,
              "children": [],
              "type": "Task",
              "startedAt": "2026-10-26T04:36:39.481Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/actors.ts",
                "line": 52
              }
            }
          ]
        }
      ],
      "narrative": "<p>Como entrenador, administradora o estudiante del gimnasio UdeM\nQuiero usar la interfaz web\nPara comprobar los requisitos RF11, RF12, RF13, RF16, RF20 y RF21</p>\n",
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
          "name": "Ana",
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
      "id": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila-e2e.feature:69"
    },
    {
      "name": "El registro diario ofrece descargar el PDF del día (RF16)",
      "category": "E2E de navegador - asistencia, cierre de jornada, registro diario y buzón",
      "outcome": "SUCCESS",
      "duration": 1391,
      "startedAt": "2026-10-26T04:36:39.509Z",
      "source": {
        "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila-e2e.feature",
        "line": 78
      },
      "tags": [
        {
          "type": "feature",
          "name": "E2E de navegador - asistencia, cierre de jornada, registro diario y buzón"
        },
        {
          "type": "tag",
          "name": "camila"
        },
        {
          "type": "tag",
          "name": "rf16"
        }
      ],
      "activities": [
        {
          "name": "Before",
          "outcome": "SUCCESS",
          "duration": 270,
          "children": [
            {
              "name": "Preparador deja la base de datos sin usuarios, reservas ni mensajes",
              "outcome": "SUCCESS",
              "duration": 6,
              "children": [],
              "type": "Interaction",
              "startedAt": "2026-10-26T04:36:39.510Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/actors.ts",
                "line": 47,
                "column": 25
              },
              "artifacts": [
                {
                  "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-preparador-deja-la-base-de-datos-s-40ad070d69.png",
                  "type": "screenshot"
                }
              ]
            },
            {
              "name": "Preparador registra la cuenta ana.admin@udemedellin.edu.co",
              "outcome": "SUCCESS",
              "duration": 23,
              "children": [],
              "type": "Interaction",
              "startedAt": "2026-10-26T04:36:39.584Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/actors.ts",
                "line": 48,
                "column": 60
              },
              "artifacts": [
                {
                  "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-preparador-registra-la-cuenta-ana--40ad070d69.png",
                  "type": "screenshot"
                }
              ]
            },
            {
              "name": "Preparador registra la cuenta tomas.coach@udem.edu.co",
              "outcome": "SUCCESS",
              "duration": 22,
              "children": [],
              "type": "Interaction",
              "startedAt": "2026-10-26T04:36:39.642Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/actors.ts",
                "line": 48,
                "column": 60
              },
              "artifacts": [
                {
                  "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-preparador-registra-la-cuenta-toma-40ad070d69.png",
                  "type": "screenshot"
                }
              ]
            },
            {
              "name": "Preparador registra la cuenta laura.est@soyudemedellin.edu.co",
              "outcome": "SUCCESS",
              "duration": 23,
              "children": [],
              "type": "Interaction",
              "startedAt": "2026-10-26T04:36:39.687Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/actors.ts",
                "line": 48,
                "column": 60
              },
              "artifacts": [
                {
                  "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-preparador-registra-la-cuenta-laur-40ad070d69.png",
                  "type": "screenshot"
                }
              ]
            },
            {
              "name": "Preparador registra la cuenta mateo.est@soyudemedellin.edu.co",
              "outcome": "SUCCESS",
              "duration": 22,
              "children": [],
              "type": "Interaction",
              "startedAt": "2026-10-26T04:36:39.734Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/actors.ts",
                "line": 48,
                "column": 60
              },
              "artifacts": [
                {
                  "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-preparador-registra-la-cuenta-mate-40ad070d69.png",
                  "type": "screenshot"
                }
              ]
            }
          ],
          "type": "Task",
          "startedAt": "2026-10-26T04:36:39.509Z",
          "location": {
            "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/actors.ts",
            "line": 33
          }
        },
        {
          "name": "Dado que Tomás inició sesión en el panel del gimnasio",
          "outcome": "SUCCESS",
          "duration": 918,
          "children": [
            {
              "name": "Tomás inicia sesión como tomas.coach@udem.edu.co",
              "outcome": "SUCCESS",
              "duration": 660,
              "children": [
                {
                  "name": "Tomás navigates to \"http://localhost:5174\"",
                  "outcome": "SUCCESS",
                  "duration": 72,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:39.785Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/step-definitions/camila-e2e.steps.ts",
                    "line": 31,
                    "column": 54
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-tom-s-navigates-to--http---localho-676377ade5.png",
                      "type": "screenshot"
                    }
                  ]
                },
                {
                  "name": "Tomás enters \"tomas.coach@udem.edu.co\" into campo correo",
                  "outcome": "SUCCESS",
                  "duration": 10,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:39.911Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/tasks.ts",
                    "line": 15,
                    "column": 36
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-tom-s-enters--tomas-coach-udem-edu-94cb0cb932.png",
                      "type": "screenshot"
                    }
                  ]
                },
                {
                  "name": "Tomás enters \"1000000002\" into campo documento (contraseña)",
                  "outcome": "SUCCESS",
                  "duration": 51,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:39.968Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/tasks.ts",
                    "line": 16,
                    "column": 40
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-tom-s-enters--1000000002--into-cam-5c6a6e69c5.png",
                      "type": "screenshot"
                    }
                  ]
                },
                {
                  "name": "Tomás clicks on botón ingresar",
                  "outcome": "SUCCESS",
                  "duration": 351,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:40.062Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/tasks.ts",
                    "line": 17,
                    "column": 13
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-tom-s-clicks-on-bot-n-ingresar-6a403a8e5e.png",
                      "type": "screenshot"
                    }
                  ]
                }
              ],
              "type": "Task",
              "startedAt": "2026-10-26T04:36:39.785Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/step-definitions/camila-e2e.steps.ts",
                "line": 31,
                "column": 54
              }
            },
            {
              "name": "Tomás abre el panel del gimnasio",
              "outcome": "SUCCESS",
              "duration": 229,
              "children": [
                {
                  "name": "Tomás waits until botón Panel does become visible",
                  "outcome": "SUCCESS",
                  "duration": 20,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:40.457Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/tasks.ts",
                    "line": 22,
                    "column": 51
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-tom-s-waits-until-bot-n-panel-does-2508a1eb8e.png",
                      "type": "screenshot"
                    }
                  ]
                },
                {
                  "name": "Tomás clicks on botón Panel",
                  "outcome": "SUCCESS",
                  "duration": 69,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:40.523Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/tasks.ts",
                    "line": 22,
                    "column": 79
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-tom-s-clicks-on-bot-n-panel-765b927df6.png",
                      "type": "screenshot"
                    }
                  ]
                },
                {
                  "name": "Tomás waits until título del panel does become visible",
                  "outcome": "SUCCESS",
                  "duration": 18,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:40.633Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/tasks.ts",
                    "line": 22,
                    "column": 96
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-tom-s-waits-until-t-tulo-del-panel-accdc9bda5.png",
                      "type": "screenshot"
                    }
                  ]
                }
              ],
              "type": "Task",
              "startedAt": "2026-10-26T04:36:40.457Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/step-definitions/camila-e2e.steps.ts",
                "line": 31,
                "column": 90
              }
            }
          ],
          "type": "Task",
          "startedAt": "2026-10-26T04:36:39.779Z",
          "location": {
            "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila-e2e.feature",
            "line": 79
          }
        },
        {
          "name": "Entonces el registro diario debe mostrar 0 asistencias",
          "outcome": "SUCCESS",
          "duration": 61,
          "children": [
            {
              "name": "Tomás ensures that the text of total de asistencias does eventually equal \"0\"",
              "outcome": "SUCCESS",
              "duration": 14,
              "children": [],
              "type": "Interaction",
              "startedAt": "2026-10-26T04:36:40.699Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/step-definitions/camila-e2e.steps.ts",
                "line": 110,
                "column": 49
              },
              "artifacts": [
                {
                  "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-tom-s-ensures-that-the-text-of-tot-3800b8dec7.png",
                  "type": "screenshot"
                }
              ]
            }
          ],
          "type": "Task",
          "startedAt": "2026-10-26T04:36:40.697Z",
          "location": {
            "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila-e2e.feature",
            "line": 80
          }
        },
        {
          "name": "Y el enlace del PDF debe apuntar a \"/reports/daily/entrenador.pdf\"",
          "outcome": "SUCCESS",
          "duration": 115,
          "children": [
            {
              "name": "Tomás ensures that \"href\" attribute of enlace Generar PDF does eventually include \"/reports/daily/entrenador.pdf\"",
              "outcome": "SUCCESS",
              "duration": 14,
              "children": [],
              "type": "Interaction",
              "startedAt": "2026-10-26T04:36:40.762Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/step-definitions/camila-e2e.steps.ts",
                "line": 119,
                "column": 12
              },
              "artifacts": [
                {
                  "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-tom-s-ensures-that--href--attribut-a01422d710.png",
                  "type": "screenshot"
                }
              ]
            },
            {
              "name": "Tomás ensures that \"href\" attribute of enlace Generar PDF does eventually include \"token=\"",
              "outcome": "SUCCESS",
              "duration": 15,
              "children": [],
              "type": "Interaction",
              "startedAt": "2026-10-26T04:36:40.822Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/step-definitions/camila-e2e.steps.ts",
                "line": 121,
                "column": 12
              },
              "artifacts": [
                {
                  "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-tom-s-ensures-that--href--attribut-ab67a1766a.png",
                  "type": "screenshot"
                }
              ]
            }
          ],
          "type": "Task",
          "startedAt": "2026-10-26T04:36:40.758Z",
          "location": {
            "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila-e2e.feature",
            "line": 81
          }
        },
        {
          "name": "After",
          "outcome": "SUCCESS",
          "duration": 1,
          "children": [],
          "type": "Task",
          "startedAt": "2026-10-26T04:36:40.873Z",
          "location": {
            "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/actors.ts",
            "line": 52
          }
        }
      ],
      "executionHistory": [
        {
          "outcome": "SUCCESS",
          "run": "2026-10-26T04-36-24.665Z",
          "timestamp": "2026-10-26T04:36:24.312Z",
          "duration": 1391,
          "activities": [
            {
              "name": "Before",
              "outcome": "SUCCESS",
              "duration": 270,
              "children": [
                {
                  "name": "Preparador deja la base de datos sin usuarios, reservas ni mensajes",
                  "outcome": "SUCCESS",
                  "duration": 6,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:39.510Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/actors.ts",
                    "line": 47,
                    "column": 25
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-preparador-deja-la-base-de-datos-s-40ad070d69.png",
                      "type": "screenshot"
                    }
                  ]
                },
                {
                  "name": "Preparador registra la cuenta ana.admin@udemedellin.edu.co",
                  "outcome": "SUCCESS",
                  "duration": 23,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:39.584Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/actors.ts",
                    "line": 48,
                    "column": 60
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-preparador-registra-la-cuenta-ana--40ad070d69.png",
                      "type": "screenshot"
                    }
                  ]
                },
                {
                  "name": "Preparador registra la cuenta tomas.coach@udem.edu.co",
                  "outcome": "SUCCESS",
                  "duration": 22,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:39.642Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/actors.ts",
                    "line": 48,
                    "column": 60
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-preparador-registra-la-cuenta-toma-40ad070d69.png",
                      "type": "screenshot"
                    }
                  ]
                },
                {
                  "name": "Preparador registra la cuenta laura.est@soyudemedellin.edu.co",
                  "outcome": "SUCCESS",
                  "duration": 23,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:39.687Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/actors.ts",
                    "line": 48,
                    "column": 60
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-preparador-registra-la-cuenta-laur-40ad070d69.png",
                      "type": "screenshot"
                    }
                  ]
                },
                {
                  "name": "Preparador registra la cuenta mateo.est@soyudemedellin.edu.co",
                  "outcome": "SUCCESS",
                  "duration": 22,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:39.734Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/actors.ts",
                    "line": 48,
                    "column": 60
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-preparador-registra-la-cuenta-mate-40ad070d69.png",
                      "type": "screenshot"
                    }
                  ]
                }
              ],
              "type": "Task",
              "startedAt": "2026-10-26T04:36:39.509Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/actors.ts",
                "line": 33
              }
            },
            {
              "name": "Dado que Tomás inició sesión en el panel del gimnasio",
              "outcome": "SUCCESS",
              "duration": 918,
              "children": [
                {
                  "name": "Tomás inicia sesión como tomas.coach@udem.edu.co",
                  "outcome": "SUCCESS",
                  "duration": 660,
                  "children": [
                    {
                      "name": "Tomás navigates to \"http://localhost:5174\"",
                      "outcome": "SUCCESS",
                      "duration": 72,
                      "children": [],
                      "type": "Interaction",
                      "startedAt": "2026-10-26T04:36:39.785Z",
                      "location": {
                        "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/step-definitions/camila-e2e.steps.ts",
                        "line": 31,
                        "column": 54
                      },
                      "artifacts": [
                        {
                          "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-tom-s-navigates-to--http---localho-676377ade5.png",
                          "type": "screenshot"
                        }
                      ]
                    },
                    {
                      "name": "Tomás enters \"tomas.coach@udem.edu.co\" into campo correo",
                      "outcome": "SUCCESS",
                      "duration": 10,
                      "children": [],
                      "type": "Interaction",
                      "startedAt": "2026-10-26T04:36:39.911Z",
                      "location": {
                        "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/tasks.ts",
                        "line": 15,
                        "column": 36
                      },
                      "artifacts": [
                        {
                          "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-tom-s-enters--tomas-coach-udem-edu-94cb0cb932.png",
                          "type": "screenshot"
                        }
                      ]
                    },
                    {
                      "name": "Tomás enters \"1000000002\" into campo documento (contraseña)",
                      "outcome": "SUCCESS",
                      "duration": 51,
                      "children": [],
                      "type": "Interaction",
                      "startedAt": "2026-10-26T04:36:39.968Z",
                      "location": {
                        "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/tasks.ts",
                        "line": 16,
                        "column": 40
                      },
                      "artifacts": [
                        {
                          "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-tom-s-enters--1000000002--into-cam-5c6a6e69c5.png",
                          "type": "screenshot"
                        }
                      ]
                    },
                    {
                      "name": "Tomás clicks on botón ingresar",
                      "outcome": "SUCCESS",
                      "duration": 351,
                      "children": [],
                      "type": "Interaction",
                      "startedAt": "2026-10-26T04:36:40.062Z",
                      "location": {
                        "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/tasks.ts",
                        "line": 17,
                        "column": 13
                      },
                      "artifacts": [
                        {
                          "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-tom-s-clicks-on-bot-n-ingresar-6a403a8e5e.png",
                          "type": "screenshot"
                        }
                      ]
                    }
                  ],
                  "type": "Task",
                  "startedAt": "2026-10-26T04:36:39.785Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/step-definitions/camila-e2e.steps.ts",
                    "line": 31,
                    "column": 54
                  }
                },
                {
                  "name": "Tomás abre el panel del gimnasio",
                  "outcome": "SUCCESS",
                  "duration": 229,
                  "children": [
                    {
                      "name": "Tomás waits until botón Panel does become visible",
                      "outcome": "SUCCESS",
                      "duration": 20,
                      "children": [],
                      "type": "Interaction",
                      "startedAt": "2026-10-26T04:36:40.457Z",
                      "location": {
                        "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/tasks.ts",
                        "line": 22,
                        "column": 51
                      },
                      "artifacts": [
                        {
                          "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-tom-s-waits-until-bot-n-panel-does-2508a1eb8e.png",
                          "type": "screenshot"
                        }
                      ]
                    },
                    {
                      "name": "Tomás clicks on botón Panel",
                      "outcome": "SUCCESS",
                      "duration": 69,
                      "children": [],
                      "type": "Interaction",
                      "startedAt": "2026-10-26T04:36:40.523Z",
                      "location": {
                        "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/tasks.ts",
                        "line": 22,
                        "column": 79
                      },
                      "artifacts": [
                        {
                          "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-tom-s-clicks-on-bot-n-panel-765b927df6.png",
                          "type": "screenshot"
                        }
                      ]
                    },
                    {
                      "name": "Tomás waits until título del panel does become visible",
                      "outcome": "SUCCESS",
                      "duration": 18,
                      "children": [],
                      "type": "Interaction",
                      "startedAt": "2026-10-26T04:36:40.633Z",
                      "location": {
                        "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/tasks.ts",
                        "line": 22,
                        "column": 96
                      },
                      "artifacts": [
                        {
                          "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-tom-s-waits-until-t-tulo-del-panel-accdc9bda5.png",
                          "type": "screenshot"
                        }
                      ]
                    }
                  ],
                  "type": "Task",
                  "startedAt": "2026-10-26T04:36:40.457Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/step-definitions/camila-e2e.steps.ts",
                    "line": 31,
                    "column": 90
                  }
                }
              ],
              "type": "Task",
              "startedAt": "2026-10-26T04:36:39.779Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila-e2e.feature",
                "line": 79
              }
            },
            {
              "name": "Entonces el registro diario debe mostrar 0 asistencias",
              "outcome": "SUCCESS",
              "duration": 61,
              "children": [
                {
                  "name": "Tomás ensures that the text of total de asistencias does eventually equal \"0\"",
                  "outcome": "SUCCESS",
                  "duration": 14,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:40.699Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/step-definitions/camila-e2e.steps.ts",
                    "line": 110,
                    "column": 49
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-tom-s-ensures-that-the-text-of-tot-3800b8dec7.png",
                      "type": "screenshot"
                    }
                  ]
                }
              ],
              "type": "Task",
              "startedAt": "2026-10-26T04:36:40.697Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila-e2e.feature",
                "line": 80
              }
            },
            {
              "name": "Y el enlace del PDF debe apuntar a \"/reports/daily/entrenador.pdf\"",
              "outcome": "SUCCESS",
              "duration": 115,
              "children": [
                {
                  "name": "Tomás ensures that \"href\" attribute of enlace Generar PDF does eventually include \"/reports/daily/entrenador.pdf\"",
                  "outcome": "SUCCESS",
                  "duration": 14,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:40.762Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/step-definitions/camila-e2e.steps.ts",
                    "line": 119,
                    "column": 12
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-tom-s-ensures-that--href--attribut-a01422d710.png",
                      "type": "screenshot"
                    }
                  ]
                },
                {
                  "name": "Tomás ensures that \"href\" attribute of enlace Generar PDF does eventually include \"token=\"",
                  "outcome": "SUCCESS",
                  "duration": 15,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:40.822Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/step-definitions/camila-e2e.steps.ts",
                    "line": 121,
                    "column": 12
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-tom-s-ensures-that--href--attribut-ab67a1766a.png",
                      "type": "screenshot"
                    }
                  ]
                }
              ],
              "type": "Task",
              "startedAt": "2026-10-26T04:36:40.758Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila-e2e.feature",
                "line": 81
              }
            },
            {
              "name": "After",
              "outcome": "SUCCESS",
              "duration": 1,
              "children": [],
              "type": "Task",
              "startedAt": "2026-10-26T04:36:40.873Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/actors.ts",
                "line": 52
              }
            }
          ]
        }
      ],
      "narrative": "<p>Como entrenador, administradora o estudiante del gimnasio UdeM\nQuiero usar la interfaz web\nPara comprobar los requisitos RF11, RF12, RF13, RF16, RF20 y RF21</p>\n",
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
      "id": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila-e2e.feature:78"
    },
    {
      "name": "La estudiante envía un reporte al administrador (RF20)",
      "category": "E2E de navegador - asistencia, cierre de jornada, registro diario y buzón",
      "outcome": "SUCCESS",
      "duration": 2460,
      "startedAt": "2026-10-26T04:36:40.901Z",
      "source": {
        "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila-e2e.feature",
        "line": 85
      },
      "tags": [
        {
          "type": "feature",
          "name": "E2E de navegador - asistencia, cierre de jornada, registro diario y buzón"
        },
        {
          "type": "tag",
          "name": "camila"
        },
        {
          "type": "tag",
          "name": "rf20"
        }
      ],
      "activities": [
        {
          "name": "Before",
          "outcome": "SUCCESS",
          "duration": 281,
          "children": [
            {
              "name": "Preparador deja la base de datos sin usuarios, reservas ni mensajes",
              "outcome": "SUCCESS",
              "duration": 7,
              "children": [],
              "type": "Interaction",
              "startedAt": "2026-10-26T04:36:40.903Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/actors.ts",
                "line": 47,
                "column": 25
              },
              "artifacts": [
                {
                  "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-preparador-deja-la-base-de-datos-s-40ad070d69.png",
                  "type": "screenshot"
                }
              ]
            },
            {
              "name": "Preparador registra la cuenta ana.admin@udemedellin.edu.co",
              "outcome": "SUCCESS",
              "duration": 23,
              "children": [],
              "type": "Interaction",
              "startedAt": "2026-10-26T04:36:40.978Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/actors.ts",
                "line": 48,
                "column": 60
              },
              "artifacts": [
                {
                  "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-preparador-registra-la-cuenta-ana--40ad070d69.png",
                  "type": "screenshot"
                }
              ]
            },
            {
              "name": "Preparador registra la cuenta tomas.coach@udem.edu.co",
              "outcome": "SUCCESS",
              "duration": 22,
              "children": [],
              "type": "Interaction",
              "startedAt": "2026-10-26T04:36:41.034Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/actors.ts",
                "line": 48,
                "column": 60
              },
              "artifacts": [
                {
                  "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-preparador-registra-la-cuenta-toma-40ad070d69.png",
                  "type": "screenshot"
                }
              ]
            },
            {
              "name": "Preparador registra la cuenta laura.est@soyudemedellin.edu.co",
              "outcome": "SUCCESS",
              "duration": 21,
              "children": [],
              "type": "Interaction",
              "startedAt": "2026-10-26T04:36:41.079Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/actors.ts",
                "line": 48,
                "column": 60
              },
              "artifacts": [
                {
                  "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-preparador-registra-la-cuenta-laur-40ad070d69.png",
                  "type": "screenshot"
                }
              ]
            },
            {
              "name": "Preparador registra la cuenta mateo.est@soyudemedellin.edu.co",
              "outcome": "SUCCESS",
              "duration": 23,
              "children": [],
              "type": "Interaction",
              "startedAt": "2026-10-26T04:36:41.134Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/actors.ts",
                "line": 48,
                "column": 60
              },
              "artifacts": [
                {
                  "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-preparador-registra-la-cuenta-mate-40ad070d69.png",
                  "type": "screenshot"
                }
              ]
            }
          ],
          "type": "Task",
          "startedAt": "2026-10-26T04:36:40.901Z",
          "location": {
            "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/actors.ts",
            "line": 33
          }
        },
        {
          "name": "Dado que Laura entró a la aplicación",
          "outcome": "SUCCESS",
          "duration": 768,
          "children": [
            {
              "name": "Laura inicia sesión como laura.est@soyudemedellin.edu.co",
              "outcome": "SUCCESS",
              "duration": 699,
              "children": [
                {
                  "name": "Laura navigates to \"http://localhost:5174\"",
                  "outcome": "SUCCESS",
                  "duration": 70,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:41.187Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/step-definitions/camila-e2e.steps.ts",
                    "line": 35,
                    "column": 54
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-laura-navigates-to--http---localho-6b89c6c149.png",
                      "type": "screenshot"
                    }
                  ]
                },
                {
                  "name": "Laura enters \"laura.est@soyudemedellin.edu.co\" into campo correo",
                  "outcome": "SUCCESS",
                  "duration": 10,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:41.313Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/tasks.ts",
                    "line": 15,
                    "column": 36
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-laura-enters--laura-est-soyudemede-cd717481a4.png",
                      "type": "screenshot"
                    }
                  ]
                },
                {
                  "name": "Laura enters \"1000000003\" into campo documento (contraseña)",
                  "outcome": "SUCCESS",
                  "duration": 61,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:41.371Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/tasks.ts",
                    "line": 16,
                    "column": 40
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-laura-enters--1000000003--into-cam-89e2159cd0.png",
                      "type": "screenshot"
                    }
                  ]
                },
                {
                  "name": "Laura clicks on botón ingresar",
                  "outcome": "SUCCESS",
                  "duration": 362,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:41.488Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/tasks.ts",
                    "line": 17,
                    "column": 13
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-laura-clicks-on-bot-n-ingresar-aa8a41dcdd.png",
                      "type": "screenshot"
                    }
                  ]
                }
              ],
              "type": "Task",
              "startedAt": "2026-10-26T04:36:41.186Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/step-definitions/camila-e2e.steps.ts",
                "line": 35,
                "column": 54
              }
            },
            {
              "name": "Laura waits until botón Perfil does become visible",
              "outcome": "SUCCESS",
              "duration": 20,
              "children": [],
              "type": "Interaction",
              "startedAt": "2026-10-26T04:36:41.896Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/step-definitions/camila-e2e.steps.ts",
                "line": 35,
                "column": 78
              },
              "artifacts": [
                {
                  "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-laura-waits-until-bot-n-perfil-doe-4c1e2296fd.png",
                  "type": "screenshot"
                }
              ]
            }
          ],
          "type": "Task",
          "startedAt": "2026-10-26T04:36:41.182Z",
          "location": {
            "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila-e2e.feature",
            "line": 86
          }
        },
        {
          "name": "Cuando envía al administrador el mensaje \"La hora del bloque no se ve bien en el celular.\"",
          "outcome": "SUCCESS",
          "duration": 1225,
          "children": [
            {
              "name": "Laura envía al administrador el mensaje \"La hora del bloque no se ve bien en el celular.\"",
              "outcome": "SUCCESS",
              "duration": 657,
              "children": [
                {
                  "name": "Laura waits until botón Historial does become visible",
                  "outcome": "SUCCESS",
                  "duration": 18,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:41.955Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/tasks.ts",
                    "line": 57,
                    "column": 7
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-laura-waits-until-bot-n-historial--ba13c586f7.png",
                      "type": "screenshot"
                    }
                  ]
                },
                {
                  "name": "Laura clicks on botón Historial",
                  "outcome": "SUCCESS",
                  "duration": 62,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:42.019Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/tasks.ts",
                    "line": 58,
                    "column": 13
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-laura-clicks-on-bot-n-historial-6354cbbd6c.png",
                      "type": "screenshot"
                    }
                  ]
                },
                {
                  "name": "Laura enters \"La hora del bloque no se ve bien en el celular.\" into campo del mensaje",
                  "outcome": "SUCCESS",
                  "duration": 3,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:42.116Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/tasks.ts",
                    "line": 59,
                    "column": 31
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-laura-enters--la-hora-del-bloque-n-2d005af7ed.png",
                      "type": "screenshot"
                    }
                  ]
                },
                {
                  "name": "Laura clicks on botón Enviar al administrador",
                  "outcome": "SUCCESS",
                  "duration": 410,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:42.153Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/tasks.ts",
                    "line": 60,
                    "column": 13
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-laura-clicks-on-bot-n-enviar-al-ad-d8b2b1b4c8.png",
                      "type": "screenshot"
                    }
                  ]
                }
              ],
              "type": "Task",
              "startedAt": "2026-10-26T04:36:41.954Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/step-definitions/camila-e2e.steps.ts",
                "line": 127,
                "column": 59
              }
            },
            {
              "name": "Laura waits until mensaje del aviso does become visible",
              "outcome": "SUCCESS",
              "duration": 531,
              "children": [],
              "type": "Interaction",
              "startedAt": "2026-10-26T04:36:42.624Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/step-definitions/camila-e2e.steps.ts",
                "line": 127,
                "column": 82
              },
              "artifacts": [
                {
                  "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-laura-waits-until-mensaje-del-avis-8f21aed951.png",
                  "type": "screenshot"
                }
              ]
            }
          ],
          "type": "Task",
          "startedAt": "2026-10-26T04:36:41.951Z",
          "location": {
            "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila-e2e.feature",
            "line": 87
          }
        },
        {
          "name": "Entonces debe aparecer el aviso \"Tu reporte llegó al administrador\"",
          "outcome": "SUCCESS",
          "duration": 106,
          "children": [
            {
              "name": "Laura waits until mensaje del aviso does become visible",
              "outcome": "SUCCESS",
              "duration": 19,
              "children": [],
              "type": "Interaction",
              "startedAt": "2026-10-26T04:36:43.179Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/step-definitions/camila-e2e.steps.ts",
                "line": 169,
                "column": 42
              },
              "artifacts": [
                {
                  "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-laura-waits-until-mensaje-del-avis-8f21aed951.png",
                  "type": "screenshot"
                }
              ]
            },
            {
              "name": "Laura ensures that the text of mensaje del aviso does eventually include \"Tu reporte llegó al administrador\"",
              "outcome": "SUCCESS",
              "duration": 14,
              "children": [],
              "type": "Interaction",
              "startedAt": "2026-10-26T04:36:43.232Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/step-definitions/camila-e2e.steps.ts",
                "line": 169,
                "column": 66
              },
              "artifacts": [
                {
                  "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-laura-ensures-that-the-text-of-men-8f21aed951.png",
                  "type": "screenshot"
                }
              ]
            }
          ],
          "type": "Task",
          "startedAt": "2026-10-26T04:36:43.176Z",
          "location": {
            "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila-e2e.feature",
            "line": 88
          }
        },
        {
          "name": "Y el buzón debe guardar 1 mensajes",
          "outcome": "SUCCESS",
          "duration": 53,
          "children": [
            {
              "name": "Laura ensures that los mensajes guardados en el buzón does eventually equal 1",
              "outcome": "SUCCESS",
              "duration": 18,
              "children": [],
              "type": "Interaction",
              "startedAt": "2026-10-26T04:36:43.284Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/step-definitions/camila-e2e.steps.ts",
                "line": 139,
                "column": 49
              },
              "artifacts": [
                {
                  "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-laura-ensures-that-los-mensajes-gu-8f21aed951.png",
                  "type": "screenshot"
                }
              ]
            }
          ],
          "type": "Task",
          "startedAt": "2026-10-26T04:36:43.282Z",
          "location": {
            "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila-e2e.feature",
            "line": 89
          }
        },
        {
          "name": "After",
          "outcome": "SUCCESS",
          "duration": 1,
          "children": [],
          "type": "Task",
          "startedAt": "2026-10-26T04:36:43.335Z",
          "location": {
            "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/actors.ts",
            "line": 52
          }
        }
      ],
      "executionHistory": [
        {
          "outcome": "SUCCESS",
          "run": "2026-10-26T04-36-24.665Z",
          "timestamp": "2026-10-26T04:36:24.312Z",
          "duration": 2460,
          "activities": [
            {
              "name": "Before",
              "outcome": "SUCCESS",
              "duration": 281,
              "children": [
                {
                  "name": "Preparador deja la base de datos sin usuarios, reservas ni mensajes",
                  "outcome": "SUCCESS",
                  "duration": 7,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:40.903Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/actors.ts",
                    "line": 47,
                    "column": 25
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-preparador-deja-la-base-de-datos-s-40ad070d69.png",
                      "type": "screenshot"
                    }
                  ]
                },
                {
                  "name": "Preparador registra la cuenta ana.admin@udemedellin.edu.co",
                  "outcome": "SUCCESS",
                  "duration": 23,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:40.978Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/actors.ts",
                    "line": 48,
                    "column": 60
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-preparador-registra-la-cuenta-ana--40ad070d69.png",
                      "type": "screenshot"
                    }
                  ]
                },
                {
                  "name": "Preparador registra la cuenta tomas.coach@udem.edu.co",
                  "outcome": "SUCCESS",
                  "duration": 22,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:41.034Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/actors.ts",
                    "line": 48,
                    "column": 60
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-preparador-registra-la-cuenta-toma-40ad070d69.png",
                      "type": "screenshot"
                    }
                  ]
                },
                {
                  "name": "Preparador registra la cuenta laura.est@soyudemedellin.edu.co",
                  "outcome": "SUCCESS",
                  "duration": 21,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:41.079Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/actors.ts",
                    "line": 48,
                    "column": 60
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-preparador-registra-la-cuenta-laur-40ad070d69.png",
                      "type": "screenshot"
                    }
                  ]
                },
                {
                  "name": "Preparador registra la cuenta mateo.est@soyudemedellin.edu.co",
                  "outcome": "SUCCESS",
                  "duration": 23,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:41.134Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/actors.ts",
                    "line": 48,
                    "column": 60
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-preparador-registra-la-cuenta-mate-40ad070d69.png",
                      "type": "screenshot"
                    }
                  ]
                }
              ],
              "type": "Task",
              "startedAt": "2026-10-26T04:36:40.901Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/actors.ts",
                "line": 33
              }
            },
            {
              "name": "Dado que Laura entró a la aplicación",
              "outcome": "SUCCESS",
              "duration": 768,
              "children": [
                {
                  "name": "Laura inicia sesión como laura.est@soyudemedellin.edu.co",
                  "outcome": "SUCCESS",
                  "duration": 699,
                  "children": [
                    {
                      "name": "Laura navigates to \"http://localhost:5174\"",
                      "outcome": "SUCCESS",
                      "duration": 70,
                      "children": [],
                      "type": "Interaction",
                      "startedAt": "2026-10-26T04:36:41.187Z",
                      "location": {
                        "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/step-definitions/camila-e2e.steps.ts",
                        "line": 35,
                        "column": 54
                      },
                      "artifacts": [
                        {
                          "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-laura-navigates-to--http---localho-6b89c6c149.png",
                          "type": "screenshot"
                        }
                      ]
                    },
                    {
                      "name": "Laura enters \"laura.est@soyudemedellin.edu.co\" into campo correo",
                      "outcome": "SUCCESS",
                      "duration": 10,
                      "children": [],
                      "type": "Interaction",
                      "startedAt": "2026-10-26T04:36:41.313Z",
                      "location": {
                        "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/tasks.ts",
                        "line": 15,
                        "column": 36
                      },
                      "artifacts": [
                        {
                          "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-laura-enters--laura-est-soyudemede-cd717481a4.png",
                          "type": "screenshot"
                        }
                      ]
                    },
                    {
                      "name": "Laura enters \"1000000003\" into campo documento (contraseña)",
                      "outcome": "SUCCESS",
                      "duration": 61,
                      "children": [],
                      "type": "Interaction",
                      "startedAt": "2026-10-26T04:36:41.371Z",
                      "location": {
                        "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/tasks.ts",
                        "line": 16,
                        "column": 40
                      },
                      "artifacts": [
                        {
                          "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-laura-enters--1000000003--into-cam-89e2159cd0.png",
                          "type": "screenshot"
                        }
                      ]
                    },
                    {
                      "name": "Laura clicks on botón ingresar",
                      "outcome": "SUCCESS",
                      "duration": 362,
                      "children": [],
                      "type": "Interaction",
                      "startedAt": "2026-10-26T04:36:41.488Z",
                      "location": {
                        "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/tasks.ts",
                        "line": 17,
                        "column": 13
                      },
                      "artifacts": [
                        {
                          "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-laura-clicks-on-bot-n-ingresar-aa8a41dcdd.png",
                          "type": "screenshot"
                        }
                      ]
                    }
                  ],
                  "type": "Task",
                  "startedAt": "2026-10-26T04:36:41.186Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/step-definitions/camila-e2e.steps.ts",
                    "line": 35,
                    "column": 54
                  }
                },
                {
                  "name": "Laura waits until botón Perfil does become visible",
                  "outcome": "SUCCESS",
                  "duration": 20,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:41.896Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/step-definitions/camila-e2e.steps.ts",
                    "line": 35,
                    "column": 78
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-laura-waits-until-bot-n-perfil-doe-4c1e2296fd.png",
                      "type": "screenshot"
                    }
                  ]
                }
              ],
              "type": "Task",
              "startedAt": "2026-10-26T04:36:41.182Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila-e2e.feature",
                "line": 86
              }
            },
            {
              "name": "Cuando envía al administrador el mensaje \"La hora del bloque no se ve bien en el celular.\"",
              "outcome": "SUCCESS",
              "duration": 1225,
              "children": [
                {
                  "name": "Laura envía al administrador el mensaje \"La hora del bloque no se ve bien en el celular.\"",
                  "outcome": "SUCCESS",
                  "duration": 657,
                  "children": [
                    {
                      "name": "Laura waits until botón Historial does become visible",
                      "outcome": "SUCCESS",
                      "duration": 18,
                      "children": [],
                      "type": "Interaction",
                      "startedAt": "2026-10-26T04:36:41.955Z",
                      "location": {
                        "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/tasks.ts",
                        "line": 57,
                        "column": 7
                      },
                      "artifacts": [
                        {
                          "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-laura-waits-until-bot-n-historial--ba13c586f7.png",
                          "type": "screenshot"
                        }
                      ]
                    },
                    {
                      "name": "Laura clicks on botón Historial",
                      "outcome": "SUCCESS",
                      "duration": 62,
                      "children": [],
                      "type": "Interaction",
                      "startedAt": "2026-10-26T04:36:42.019Z",
                      "location": {
                        "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/tasks.ts",
                        "line": 58,
                        "column": 13
                      },
                      "artifacts": [
                        {
                          "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-laura-clicks-on-bot-n-historial-6354cbbd6c.png",
                          "type": "screenshot"
                        }
                      ]
                    },
                    {
                      "name": "Laura enters \"La hora del bloque no se ve bien en el celular.\" into campo del mensaje",
                      "outcome": "SUCCESS",
                      "duration": 3,
                      "children": [],
                      "type": "Interaction",
                      "startedAt": "2026-10-26T04:36:42.116Z",
                      "location": {
                        "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/tasks.ts",
                        "line": 59,
                        "column": 31
                      },
                      "artifacts": [
                        {
                          "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-laura-enters--la-hora-del-bloque-n-2d005af7ed.png",
                          "type": "screenshot"
                        }
                      ]
                    },
                    {
                      "name": "Laura clicks on botón Enviar al administrador",
                      "outcome": "SUCCESS",
                      "duration": 410,
                      "children": [],
                      "type": "Interaction",
                      "startedAt": "2026-10-26T04:36:42.153Z",
                      "location": {
                        "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/tasks.ts",
                        "line": 60,
                        "column": 13
                      },
                      "artifacts": [
                        {
                          "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-laura-clicks-on-bot-n-enviar-al-ad-d8b2b1b4c8.png",
                          "type": "screenshot"
                        }
                      ]
                    }
                  ],
                  "type": "Task",
                  "startedAt": "2026-10-26T04:36:41.954Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/step-definitions/camila-e2e.steps.ts",
                    "line": 127,
                    "column": 59
                  }
                },
                {
                  "name": "Laura waits until mensaje del aviso does become visible",
                  "outcome": "SUCCESS",
                  "duration": 531,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:42.624Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/step-definitions/camila-e2e.steps.ts",
                    "line": 127,
                    "column": 82
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-laura-waits-until-mensaje-del-avis-8f21aed951.png",
                      "type": "screenshot"
                    }
                  ]
                }
              ],
              "type": "Task",
              "startedAt": "2026-10-26T04:36:41.951Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila-e2e.feature",
                "line": 87
              }
            },
            {
              "name": "Entonces debe aparecer el aviso \"Tu reporte llegó al administrador\"",
              "outcome": "SUCCESS",
              "duration": 106,
              "children": [
                {
                  "name": "Laura waits until mensaje del aviso does become visible",
                  "outcome": "SUCCESS",
                  "duration": 19,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:43.179Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/step-definitions/camila-e2e.steps.ts",
                    "line": 169,
                    "column": 42
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-laura-waits-until-mensaje-del-avis-8f21aed951.png",
                      "type": "screenshot"
                    }
                  ]
                },
                {
                  "name": "Laura ensures that the text of mensaje del aviso does eventually include \"Tu reporte llegó al administrador\"",
                  "outcome": "SUCCESS",
                  "duration": 14,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:43.232Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/step-definitions/camila-e2e.steps.ts",
                    "line": 169,
                    "column": 66
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-laura-ensures-that-the-text-of-men-8f21aed951.png",
                      "type": "screenshot"
                    }
                  ]
                }
              ],
              "type": "Task",
              "startedAt": "2026-10-26T04:36:43.176Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila-e2e.feature",
                "line": 88
              }
            },
            {
              "name": "Y el buzón debe guardar 1 mensajes",
              "outcome": "SUCCESS",
              "duration": 53,
              "children": [
                {
                  "name": "Laura ensures that los mensajes guardados en el buzón does eventually equal 1",
                  "outcome": "SUCCESS",
                  "duration": 18,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:43.284Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/step-definitions/camila-e2e.steps.ts",
                    "line": 139,
                    "column": 49
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-laura-ensures-that-los-mensajes-gu-8f21aed951.png",
                      "type": "screenshot"
                    }
                  ]
                }
              ],
              "type": "Task",
              "startedAt": "2026-10-26T04:36:43.282Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila-e2e.feature",
                "line": 89
              }
            },
            {
              "name": "After",
              "outcome": "SUCCESS",
              "duration": 1,
              "children": [],
              "type": "Task",
              "startedAt": "2026-10-26T04:36:43.335Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/actors.ts",
                "line": 52
              }
            }
          ]
        }
      ],
      "narrative": "<p>Como entrenador, administradora o estudiante del gimnasio UdeM\nQuiero usar la interfaz web\nPara comprobar los requisitos RF11, RF12, RF13, RF16, RF20 y RF21</p>\n",
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
      "id": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila-e2e.feature:85"
    },
    {
      "name": "No se puede enviar un mensaje vacío (RF20 alterno)",
      "category": "E2E de navegador - asistencia, cierre de jornada, registro diario y buzón",
      "outcome": "SUCCESS",
      "duration": 1347,
      "startedAt": "2026-10-26T04:36:43.363Z",
      "source": {
        "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila-e2e.feature",
        "line": 92
      },
      "tags": [
        {
          "type": "feature",
          "name": "E2E de navegador - asistencia, cierre de jornada, registro diario y buzón"
        },
        {
          "type": "tag",
          "name": "camila"
        },
        {
          "type": "tag",
          "name": "rf20"
        }
      ],
      "activities": [
        {
          "name": "Before",
          "outcome": "SUCCESS",
          "duration": 292,
          "children": [
            {
              "name": "Preparador deja la base de datos sin usuarios, reservas ni mensajes",
              "outcome": "SUCCESS",
              "duration": 6,
              "children": [],
              "type": "Interaction",
              "startedAt": "2026-10-26T04:36:43.366Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/actors.ts",
                "line": 47,
                "column": 25
              },
              "artifacts": [
                {
                  "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-preparador-deja-la-base-de-datos-s-40ad070d69.png",
                  "type": "screenshot"
                }
              ]
            },
            {
              "name": "Preparador registra la cuenta ana.admin@udemedellin.edu.co",
              "outcome": "SUCCESS",
              "duration": 23,
              "children": [],
              "type": "Interaction",
              "startedAt": "2026-10-26T04:36:43.463Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/actors.ts",
                "line": 48,
                "column": 60
              },
              "artifacts": [
                {
                  "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-preparador-registra-la-cuenta-ana--40ad070d69.png",
                  "type": "screenshot"
                }
              ]
            },
            {
              "name": "Preparador registra la cuenta tomas.coach@udem.edu.co",
              "outcome": "SUCCESS",
              "duration": 21,
              "children": [],
              "type": "Interaction",
              "startedAt": "2026-10-26T04:36:43.509Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/actors.ts",
                "line": 48,
                "column": 60
              },
              "artifacts": [
                {
                  "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-preparador-registra-la-cuenta-toma-40ad070d69.png",
                  "type": "screenshot"
                }
              ]
            },
            {
              "name": "Preparador registra la cuenta laura.est@soyudemedellin.edu.co",
              "outcome": "SUCCESS",
              "duration": 22,
              "children": [],
              "type": "Interaction",
              "startedAt": "2026-10-26T04:36:43.553Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/actors.ts",
                "line": 48,
                "column": 60
              },
              "artifacts": [
                {
                  "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-preparador-registra-la-cuenta-laur-40ad070d69.png",
                  "type": "screenshot"
                }
              ]
            },
            {
              "name": "Preparador registra la cuenta mateo.est@soyudemedellin.edu.co",
              "outcome": "SUCCESS",
              "duration": 23,
              "children": [],
              "type": "Interaction",
              "startedAt": "2026-10-26T04:36:43.611Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/actors.ts",
                "line": 48,
                "column": 60
              },
              "artifacts": [
                {
                  "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-preparador-registra-la-cuenta-mate-40ad070d69.png",
                  "type": "screenshot"
                }
              ]
            }
          ],
          "type": "Task",
          "startedAt": "2026-10-26T04:36:43.364Z",
          "location": {
            "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/actors.ts",
            "line": 33
          }
        },
        {
          "name": "Dado que Laura entró a la aplicación",
          "outcome": "SUCCESS",
          "duration": 768,
          "children": [
            {
              "name": "Laura inicia sesión como laura.est@soyudemedellin.edu.co",
              "outcome": "SUCCESS",
              "duration": 698,
              "children": [
                {
                  "name": "Laura navigates to \"http://localhost:5174\"",
                  "outcome": "SUCCESS",
                  "duration": 71,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:43.661Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/step-definitions/camila-e2e.steps.ts",
                    "line": 35,
                    "column": 54
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-laura-navigates-to--http---localho-676377ade5.png",
                      "type": "screenshot"
                    }
                  ]
                },
                {
                  "name": "Laura enters \"laura.est@soyudemedellin.edu.co\" into campo correo",
                  "outcome": "SUCCESS",
                  "duration": 10,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:43.788Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/tasks.ts",
                    "line": 15,
                    "column": 36
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-laura-enters--laura-est-soyudemede-a163a16f2b.png",
                      "type": "screenshot"
                    }
                  ]
                },
                {
                  "name": "Laura enters \"1000000003\" into campo documento (contraseña)",
                  "outcome": "SUCCESS",
                  "duration": 55,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:43.855Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/tasks.ts",
                    "line": 16,
                    "column": 40
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-laura-enters--1000000003--into-cam-4d323a3d04.png",
                      "type": "screenshot"
                    }
                  ]
                },
                {
                  "name": "Laura clicks on botón ingresar",
                  "outcome": "SUCCESS",
                  "duration": 368,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:43.956Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/tasks.ts",
                    "line": 17,
                    "column": 13
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-laura-clicks-on-bot-n-ingresar-aa8a41dcdd.png",
                      "type": "screenshot"
                    }
                  ]
                }
              ],
              "type": "Task",
              "startedAt": "2026-10-26T04:36:43.660Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/step-definitions/camila-e2e.steps.ts",
                "line": 35,
                "column": 54
              }
            },
            {
              "name": "Laura waits until botón Perfil does become visible",
              "outcome": "SUCCESS",
              "duration": 19,
              "children": [],
              "type": "Interaction",
              "startedAt": "2026-10-26T04:36:44.370Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/step-definitions/camila-e2e.steps.ts",
                "line": 35,
                "column": 78
              },
              "artifacts": [
                {
                  "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-laura-waits-until-bot-n-perfil-doe-4c1e2296fd.png",
                  "type": "screenshot"
                }
              ]
            }
          ],
          "type": "Task",
          "startedAt": "2026-10-26T04:36:43.656Z",
          "location": {
            "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila-e2e.feature",
            "line": 93
          }
        },
        {
          "name": "Cuando abre el formulario de reportes y escribe solo espacios",
          "outcome": "SUCCESS",
          "duration": 135,
          "children": [
            {
              "name": "Laura clicks on botón Historial",
              "outcome": "SUCCESS",
              "duration": 61,
              "children": [],
              "type": "Interaction",
              "startedAt": "2026-10-26T04:36:44.426Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/step-definitions/camila-e2e.steps.ts",
                "line": 131,
                "column": 48
              },
              "artifacts": [
                {
                  "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-laura-clicks-on-bot-n-historial-6354cbbd6c.png",
                  "type": "screenshot"
                }
              ]
            },
            {
              "name": "Laura enters \"    \" into campo del mensaje",
              "outcome": "SUCCESS",
              "duration": 3,
              "children": [],
              "type": "Interaction",
              "startedAt": "2026-10-26T04:36:44.523Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/step-definitions/camila-e2e.steps.ts",
                "line": 131,
                "column": 92
              },
              "artifacts": [
                {
                  "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-laura-enters--------into-campo-del-8ac5b2fdd4.png",
                  "type": "screenshot"
                }
              ]
            }
          ],
          "type": "Task",
          "startedAt": "2026-10-26T04:36:44.424Z",
          "location": {
            "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila-e2e.feature",
            "line": 94
          }
        },
        {
          "name": "Entonces el botón de enviar debe estar deshabilitado",
          "outcome": "SUCCESS",
          "duration": 63,
          "children": [
            {
              "name": "Laura ensures that botón Enviar al administrador does not become enabled",
              "outcome": "SUCCESS",
              "duration": 5,
              "children": [],
              "type": "Interaction",
              "startedAt": "2026-10-26T04:36:44.560Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/step-definitions/camila-e2e.steps.ts",
                "line": 135,
                "column": 49
              },
              "artifacts": [
                {
                  "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-laura-ensures-that-bot-n-enviar-al-0d28f588bb.png",
                  "type": "screenshot"
                }
              ]
            }
          ],
          "type": "Task",
          "startedAt": "2026-10-26T04:36:44.559Z",
          "location": {
            "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila-e2e.feature",
            "line": 95
          }
        },
        {
          "name": "Y el buzón debe guardar 0 mensajes",
          "outcome": "SUCCESS",
          "duration": 63,
          "children": [
            {
              "name": "Laura ensures that los mensajes guardados en el buzón does eventually equal 0",
              "outcome": "SUCCESS",
              "duration": 16,
              "children": [],
              "type": "Interaction",
              "startedAt": "2026-10-26T04:36:44.624Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/step-definitions/camila-e2e.steps.ts",
                "line": 139,
                "column": 49
              },
              "artifacts": [
                {
                  "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-laura-ensures-that-los-mensajes-gu-2fcb910a8e.png",
                  "type": "screenshot"
                }
              ]
            }
          ],
          "type": "Task",
          "startedAt": "2026-10-26T04:36:44.622Z",
          "location": {
            "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila-e2e.feature",
            "line": 96
          }
        },
        {
          "name": "After",
          "outcome": "SUCCESS",
          "duration": 1,
          "children": [],
          "type": "Task",
          "startedAt": "2026-10-26T04:36:44.685Z",
          "location": {
            "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/actors.ts",
            "line": 52
          }
        }
      ],
      "executionHistory": [
        {
          "outcome": "SUCCESS",
          "run": "2026-10-26T04-36-24.665Z",
          "timestamp": "2026-10-26T04:36:24.312Z",
          "duration": 1347,
          "activities": [
            {
              "name": "Before",
              "outcome": "SUCCESS",
              "duration": 292,
              "children": [
                {
                  "name": "Preparador deja la base de datos sin usuarios, reservas ni mensajes",
                  "outcome": "SUCCESS",
                  "duration": 6,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:43.366Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/actors.ts",
                    "line": 47,
                    "column": 25
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-preparador-deja-la-base-de-datos-s-40ad070d69.png",
                      "type": "screenshot"
                    }
                  ]
                },
                {
                  "name": "Preparador registra la cuenta ana.admin@udemedellin.edu.co",
                  "outcome": "SUCCESS",
                  "duration": 23,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:43.463Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/actors.ts",
                    "line": 48,
                    "column": 60
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-preparador-registra-la-cuenta-ana--40ad070d69.png",
                      "type": "screenshot"
                    }
                  ]
                },
                {
                  "name": "Preparador registra la cuenta tomas.coach@udem.edu.co",
                  "outcome": "SUCCESS",
                  "duration": 21,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:43.509Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/actors.ts",
                    "line": 48,
                    "column": 60
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-preparador-registra-la-cuenta-toma-40ad070d69.png",
                      "type": "screenshot"
                    }
                  ]
                },
                {
                  "name": "Preparador registra la cuenta laura.est@soyudemedellin.edu.co",
                  "outcome": "SUCCESS",
                  "duration": 22,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:43.553Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/actors.ts",
                    "line": 48,
                    "column": 60
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-preparador-registra-la-cuenta-laur-40ad070d69.png",
                      "type": "screenshot"
                    }
                  ]
                },
                {
                  "name": "Preparador registra la cuenta mateo.est@soyudemedellin.edu.co",
                  "outcome": "SUCCESS",
                  "duration": 23,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:43.611Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/actors.ts",
                    "line": 48,
                    "column": 60
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-preparador-registra-la-cuenta-mate-40ad070d69.png",
                      "type": "screenshot"
                    }
                  ]
                }
              ],
              "type": "Task",
              "startedAt": "2026-10-26T04:36:43.364Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/actors.ts",
                "line": 33
              }
            },
            {
              "name": "Dado que Laura entró a la aplicación",
              "outcome": "SUCCESS",
              "duration": 768,
              "children": [
                {
                  "name": "Laura inicia sesión como laura.est@soyudemedellin.edu.co",
                  "outcome": "SUCCESS",
                  "duration": 698,
                  "children": [
                    {
                      "name": "Laura navigates to \"http://localhost:5174\"",
                      "outcome": "SUCCESS",
                      "duration": 71,
                      "children": [],
                      "type": "Interaction",
                      "startedAt": "2026-10-26T04:36:43.661Z",
                      "location": {
                        "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/step-definitions/camila-e2e.steps.ts",
                        "line": 35,
                        "column": 54
                      },
                      "artifacts": [
                        {
                          "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-laura-navigates-to--http---localho-676377ade5.png",
                          "type": "screenshot"
                        }
                      ]
                    },
                    {
                      "name": "Laura enters \"laura.est@soyudemedellin.edu.co\" into campo correo",
                      "outcome": "SUCCESS",
                      "duration": 10,
                      "children": [],
                      "type": "Interaction",
                      "startedAt": "2026-10-26T04:36:43.788Z",
                      "location": {
                        "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/tasks.ts",
                        "line": 15,
                        "column": 36
                      },
                      "artifacts": [
                        {
                          "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-laura-enters--laura-est-soyudemede-a163a16f2b.png",
                          "type": "screenshot"
                        }
                      ]
                    },
                    {
                      "name": "Laura enters \"1000000003\" into campo documento (contraseña)",
                      "outcome": "SUCCESS",
                      "duration": 55,
                      "children": [],
                      "type": "Interaction",
                      "startedAt": "2026-10-26T04:36:43.855Z",
                      "location": {
                        "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/tasks.ts",
                        "line": 16,
                        "column": 40
                      },
                      "artifacts": [
                        {
                          "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-laura-enters--1000000003--into-cam-4d323a3d04.png",
                          "type": "screenshot"
                        }
                      ]
                    },
                    {
                      "name": "Laura clicks on botón ingresar",
                      "outcome": "SUCCESS",
                      "duration": 368,
                      "children": [],
                      "type": "Interaction",
                      "startedAt": "2026-10-26T04:36:43.956Z",
                      "location": {
                        "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/tasks.ts",
                        "line": 17,
                        "column": 13
                      },
                      "artifacts": [
                        {
                          "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-laura-clicks-on-bot-n-ingresar-aa8a41dcdd.png",
                          "type": "screenshot"
                        }
                      ]
                    }
                  ],
                  "type": "Task",
                  "startedAt": "2026-10-26T04:36:43.660Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/step-definitions/camila-e2e.steps.ts",
                    "line": 35,
                    "column": 54
                  }
                },
                {
                  "name": "Laura waits until botón Perfil does become visible",
                  "outcome": "SUCCESS",
                  "duration": 19,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:44.370Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/step-definitions/camila-e2e.steps.ts",
                    "line": 35,
                    "column": 78
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-laura-waits-until-bot-n-perfil-doe-4c1e2296fd.png",
                      "type": "screenshot"
                    }
                  ]
                }
              ],
              "type": "Task",
              "startedAt": "2026-10-26T04:36:43.656Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila-e2e.feature",
                "line": 93
              }
            },
            {
              "name": "Cuando abre el formulario de reportes y escribe solo espacios",
              "outcome": "SUCCESS",
              "duration": 135,
              "children": [
                {
                  "name": "Laura clicks on botón Historial",
                  "outcome": "SUCCESS",
                  "duration": 61,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:44.426Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/step-definitions/camila-e2e.steps.ts",
                    "line": 131,
                    "column": 48
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-laura-clicks-on-bot-n-historial-6354cbbd6c.png",
                      "type": "screenshot"
                    }
                  ]
                },
                {
                  "name": "Laura enters \"    \" into campo del mensaje",
                  "outcome": "SUCCESS",
                  "duration": 3,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:44.523Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/step-definitions/camila-e2e.steps.ts",
                    "line": 131,
                    "column": 92
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-laura-enters--------into-campo-del-8ac5b2fdd4.png",
                      "type": "screenshot"
                    }
                  ]
                }
              ],
              "type": "Task",
              "startedAt": "2026-10-26T04:36:44.424Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila-e2e.feature",
                "line": 94
              }
            },
            {
              "name": "Entonces el botón de enviar debe estar deshabilitado",
              "outcome": "SUCCESS",
              "duration": 63,
              "children": [
                {
                  "name": "Laura ensures that botón Enviar al administrador does not become enabled",
                  "outcome": "SUCCESS",
                  "duration": 5,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:44.560Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/step-definitions/camila-e2e.steps.ts",
                    "line": 135,
                    "column": 49
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-laura-ensures-that-bot-n-enviar-al-0d28f588bb.png",
                      "type": "screenshot"
                    }
                  ]
                }
              ],
              "type": "Task",
              "startedAt": "2026-10-26T04:36:44.559Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila-e2e.feature",
                "line": 95
              }
            },
            {
              "name": "Y el buzón debe guardar 0 mensajes",
              "outcome": "SUCCESS",
              "duration": 63,
              "children": [
                {
                  "name": "Laura ensures that los mensajes guardados en el buzón does eventually equal 0",
                  "outcome": "SUCCESS",
                  "duration": 16,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:44.624Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/step-definitions/camila-e2e.steps.ts",
                    "line": 139,
                    "column": 49
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-laura-ensures-that-los-mensajes-gu-2fcb910a8e.png",
                      "type": "screenshot"
                    }
                  ]
                }
              ],
              "type": "Task",
              "startedAt": "2026-10-26T04:36:44.622Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila-e2e.feature",
                "line": 96
              }
            },
            {
              "name": "After",
              "outcome": "SUCCESS",
              "duration": 1,
              "children": [],
              "type": "Task",
              "startedAt": "2026-10-26T04:36:44.685Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/actors.ts",
                "line": 52
              }
            }
          ]
        }
      ],
      "narrative": "<p>Como entrenador, administradora o estudiante del gimnasio UdeM\nQuiero usar la interfaz web\nPara comprobar los requisitos RF11, RF12, RF13, RF16, RF20 y RF21</p>\n",
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
      "id": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila-e2e.feature:92"
    },
    {
      "name": "La administradora lee y borra un mensaje del buzón (RF21)",
      "category": "E2E de navegador - asistencia, cierre de jornada, registro diario y buzón",
      "outcome": "SUCCESS",
      "duration": 2581,
      "startedAt": "2026-10-26T04:36:44.711Z",
      "source": {
        "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila-e2e.feature",
        "line": 100
      },
      "tags": [
        {
          "type": "feature",
          "name": "E2E de navegador - asistencia, cierre de jornada, registro diario y buzón"
        },
        {
          "type": "tag",
          "name": "camila"
        },
        {
          "type": "tag",
          "name": "rf21"
        }
      ],
      "activities": [
        {
          "name": "Before",
          "outcome": "SUCCESS",
          "duration": 274,
          "children": [
            {
              "name": "Preparador deja la base de datos sin usuarios, reservas ni mensajes",
              "outcome": "SUCCESS",
              "duration": 6,
              "children": [],
              "type": "Interaction",
              "startedAt": "2026-10-26T04:36:44.714Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/actors.ts",
                "line": 47,
                "column": 25
              },
              "artifacts": [
                {
                  "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-preparador-deja-la-base-de-datos-s-40ad070d69.png",
                  "type": "screenshot"
                }
              ]
            },
            {
              "name": "Preparador registra la cuenta ana.admin@udemedellin.edu.co",
              "outcome": "SUCCESS",
              "duration": 22,
              "children": [],
              "type": "Interaction",
              "startedAt": "2026-10-26T04:36:44.795Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/actors.ts",
                "line": 48,
                "column": 60
              },
              "artifacts": [
                {
                  "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-preparador-registra-la-cuenta-ana--40ad070d69.png",
                  "type": "screenshot"
                }
              ]
            },
            {
              "name": "Preparador registra la cuenta tomas.coach@udem.edu.co",
              "outcome": "SUCCESS",
              "duration": 23,
              "children": [],
              "type": "Interaction",
              "startedAt": "2026-10-26T04:36:44.842Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/actors.ts",
                "line": 48,
                "column": 60
              },
              "artifacts": [
                {
                  "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-preparador-registra-la-cuenta-toma-40ad070d69.png",
                  "type": "screenshot"
                }
              ]
            },
            {
              "name": "Preparador registra la cuenta laura.est@soyudemedellin.edu.co",
              "outcome": "SUCCESS",
              "duration": 21,
              "children": [],
              "type": "Interaction",
              "startedAt": "2026-10-26T04:36:44.887Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/actors.ts",
                "line": 48,
                "column": 60
              },
              "artifacts": [
                {
                  "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-preparador-registra-la-cuenta-laur-40ad070d69.png",
                  "type": "screenshot"
                }
              ]
            },
            {
              "name": "Preparador registra la cuenta mateo.est@soyudemedellin.edu.co",
              "outcome": "SUCCESS",
              "duration": 21,
              "children": [],
              "type": "Interaction",
              "startedAt": "2026-10-26T04:36:44.943Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/actors.ts",
                "line": 48,
                "column": 60
              },
              "artifacts": [
                {
                  "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-preparador-registra-la-cuenta-mate-40ad070d69.png",
                  "type": "screenshot"
                }
              ]
            }
          ],
          "type": "Task",
          "startedAt": "2026-10-26T04:36:44.712Z",
          "location": {
            "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/actors.ts",
            "line": 33
          }
        },
        {
          "name": "Dado que Laura dejó en el buzón el mensaje \"No carga el historial.\"",
          "outcome": "SUCCESS",
          "duration": 54,
          "children": [
            {
              "name": "Preparador deja en el buzón el mensaje \"No carga el historial.\"",
              "outcome": "SUCCESS",
              "duration": 28,
              "children": [],
              "type": "Interaction",
              "startedAt": "2026-10-26T04:36:44.987Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/step-definitions/camila-e2e.steps.ts",
                "line": 27,
                "column": 68
              },
              "artifacts": [
                {
                  "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-preparador-deja-en-el-buz-n-el-men-40ad070d69.png",
                  "type": "screenshot"
                }
              ]
            }
          ],
          "type": "Task",
          "startedAt": "2026-10-26T04:36:44.986Z",
          "location": {
            "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila-e2e.feature",
            "line": 101
          }
        },
        {
          "name": "Y que Ana entró a la aplicación",
          "outcome": "SUCCESS",
          "duration": 804,
          "children": [
            {
              "name": "Ana inicia sesión como ana.admin@udemedellin.edu.co",
              "outcome": "SUCCESS",
              "duration": 735,
              "children": [
                {
                  "name": "Ana navigates to \"http://localhost:5174\"",
                  "outcome": "SUCCESS",
                  "duration": 77,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:45.044Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/step-definitions/camila-e2e.steps.ts",
                    "line": 35,
                    "column": 54
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-ana-navigates-to--http---localhost-891de9ff46.png",
                      "type": "screenshot"
                    }
                  ]
                },
                {
                  "name": "Ana enters \"ana.admin@udemedellin.edu.co\" into campo correo",
                  "outcome": "SUCCESS",
                  "duration": 10,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:45.189Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/tasks.ts",
                    "line": 15,
                    "column": 36
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-ana-enters--ana-admin-udemedellin--c56eff6028.png",
                      "type": "screenshot"
                    }
                  ]
                },
                {
                  "name": "Ana enters \"1000000001\" into campo documento (contraseña)",
                  "outcome": "SUCCESS",
                  "duration": 75,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:45.257Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/tasks.ts",
                    "line": 16,
                    "column": 40
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-ana-enters--1000000001--into-campo-216bfb1a41.png",
                      "type": "screenshot"
                    }
                  ]
                },
                {
                  "name": "Ana clicks on botón ingresar",
                  "outcome": "SUCCESS",
                  "duration": 344,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:45.389Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/tasks.ts",
                    "line": 17,
                    "column": 13
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-ana-clicks-on-bot-n-ingresar-cfe117b195.png",
                      "type": "screenshot"
                    }
                  ]
                }
              ],
              "type": "Task",
              "startedAt": "2026-10-26T04:36:45.044Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/step-definitions/camila-e2e.steps.ts",
                "line": 35,
                "column": 54
              }
            },
            {
              "name": "Ana waits until botón Perfil does become visible",
              "outcome": "SUCCESS",
              "duration": 19,
              "children": [],
              "type": "Interaction",
              "startedAt": "2026-10-26T04:36:45.791Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/step-definitions/camila-e2e.steps.ts",
                "line": 35,
                "column": 78
              },
              "artifacts": [
                {
                  "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-ana-waits-until-bot-n-perfil-does--34c24aad71.png",
                  "type": "screenshot"
                }
              ]
            }
          ],
          "type": "Task",
          "startedAt": "2026-10-26T04:36:45.040Z",
          "location": {
            "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila-e2e.feature",
            "line": 102
          }
        },
        {
          "name": "Cuando abre el buzón de sugerencias",
          "outcome": "SUCCESS",
          "duration": 269,
          "children": [
            {
              "name": "Ana abre el buzón de sugerencias",
              "outcome": "SUCCESS",
              "duration": 253,
              "children": [
                {
                  "name": "Ana waits until botón Usuarios does become visible",
                  "outcome": "SUCCESS",
                  "duration": 18,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:45.847Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/tasks.ts",
                    "line": 66,
                    "column": 53
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-ana-waits-until-bot-n-usuarios-doe-56cae6b897.png",
                      "type": "screenshot"
                    }
                  ]
                },
                {
                  "name": "Ana clicks on botón Usuarios",
                  "outcome": "SUCCESS",
                  "duration": 60,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:45.912Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/tasks.ts",
                    "line": 66,
                    "column": 84
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-ana-clicks-on-bot-n-usuarios-218c857182.png",
                      "type": "screenshot"
                    }
                  ]
                },
                {
                  "name": "Ana waits until contador del buzón does become visible",
                  "outcome": "SUCCESS",
                  "duration": 21,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:46.008Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/tasks.ts",
                    "line": 66,
                    "column": 104
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-ana-waits-until-contador-del-buz-n-be23cce350.png",
                      "type": "screenshot"
                    }
                  ]
                }
              ],
              "type": "Task",
              "startedAt": "2026-10-26T04:36:45.847Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/step-definitions/camila-e2e.steps.ts",
                "line": 144,
                "column": 54
              }
            }
          ],
          "type": "Task",
          "startedAt": "2026-10-26T04:36:45.844Z",
          "location": {
            "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila-e2e.feature",
            "line": 103
          }
        },
        {
          "name": "Entonces el buzón debe mostrar 1 mensajes",
          "outcome": "SUCCESS",
          "duration": 62,
          "children": [
            {
              "name": "Ana ensures that the text of contador del buzón does eventually equal \"1\"",
              "outcome": "SUCCESS",
              "duration": 14,
              "children": [],
              "type": "Interaction",
              "startedAt": "2026-10-26T04:36:46.115Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/step-definitions/camila-e2e.steps.ts",
                "line": 156,
                "column": 49
              },
              "artifacts": [
                {
                  "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-ana-ensures-that-the-text-of-conta-0bf0c5ed37.png",
                  "type": "screenshot"
                }
              ]
            }
          ],
          "type": "Task",
          "startedAt": "2026-10-26T04:36:46.113Z",
          "location": {
            "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila-e2e.feature",
            "line": 104
          }
        },
        {
          "name": "Y debe ver en el buzón el mensaje \"No carga el historial.\"",
          "outcome": "SUCCESS",
          "duration": 87,
          "children": [
            {
              "name": "Ana ensures that the text of mensajes del buzón does eventually contain at least one item that does include \"No carga el historial.\"",
              "outcome": "SUCCESS",
              "duration": 16,
              "children": [],
              "type": "Interaction",
              "startedAt": "2026-10-26T04:36:46.178Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/step-definitions/camila-e2e.steps.ts",
                "line": 160,
                "column": 49
              },
              "artifacts": [
                {
                  "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-ana-ensures-that-the-text-of-mensa-bd997ada09.png",
                  "type": "screenshot"
                }
              ]
            }
          ],
          "type": "Task",
          "startedAt": "2026-10-26T04:36:46.176Z",
          "location": {
            "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila-e2e.feature",
            "line": 105
          }
        },
        {
          "name": "Cuando borra el primer mensaje y confirma",
          "outcome": "SUCCESS",
          "duration": 247,
          "children": [
            {
              "name": "Ana borra el primer mensaje del buzón y confirma",
              "outcome": "SUCCESS",
              "duration": 234,
              "children": [
                {
                  "name": "Ana performs bound QuestionStatement",
                  "outcome": "SUCCESS",
                  "duration": 0,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:46.266Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/node_modules/@serenity-js/web/src/screenplay/models/dialogs/ModalDialog.ts",
                    "line": 135,
                    "column": 45
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-ana-accepts-next-modal-dialog-wind-82f740f7f4.png",
                      "type": "screenshot"
                    }
                  ]
                },
                {
                  "name": "Ana clicks on botón Borrar del primer mensaje",
                  "outcome": "SUCCESS",
                  "duration": 143,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:46.311Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/tasks.ts",
                    "line": 69,
                    "column": 101
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-ana-clicks-on-bot-n-borrar-del-pri-80a1f0a6e5.png",
                      "type": "screenshot"
                    }
                  ]
                }
              ],
              "type": "Task",
              "startedAt": "2026-10-26T04:36:46.265Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/step-definitions/camila-e2e.steps.ts",
                "line": 152,
                "column": 63
              }
            }
          ],
          "type": "Task",
          "startedAt": "2026-10-26T04:36:46.263Z",
          "location": {
            "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila-e2e.feature",
            "line": 106
          }
        },
        {
          "name": "Entonces debe aparecer el aviso \"Mensaje borrado del buzón\"",
          "outcome": "SUCCESS",
          "duration": 639,
          "children": [
            {
              "name": "Ana waits until mensaje del aviso does become visible",
              "outcome": "SUCCESS",
              "duration": 529,
              "children": [],
              "type": "Interaction",
              "startedAt": "2026-10-26T04:36:46.513Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/step-definitions/camila-e2e.steps.ts",
                "line": 169,
                "column": 42
              },
              "artifacts": [
                {
                  "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-ana-waits-until-mensaje-del-aviso--e4e80ab9cb.png",
                  "type": "screenshot"
                }
              ]
            },
            {
              "name": "Ana ensures that the text of mensaje del aviso does eventually include \"Mensaje borrado del buzón\"",
              "outcome": "SUCCESS",
              "duration": 14,
              "children": [],
              "type": "Interaction",
              "startedAt": "2026-10-26T04:36:47.088Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/step-definitions/camila-e2e.steps.ts",
                "line": 169,
                "column": 66
              },
              "artifacts": [
                {
                  "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-ana-ensures-that-the-text-of-mensa-e4e80ab9cb.png",
                  "type": "screenshot"
                }
              ]
            }
          ],
          "type": "Task",
          "startedAt": "2026-10-26T04:36:46.510Z",
          "location": {
            "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila-e2e.feature",
            "line": 107
          }
        },
        {
          "name": "Y debe ver el aviso de buzón vacío \"Todavía no hay mensajes\"",
          "outcome": "SUCCESS",
          "duration": 63,
          "children": [
            {
              "name": "Ana ensures that the text of aviso de buzón vacío does eventually include \"Todavía no hay mensajes\"",
              "outcome": "SUCCESS",
              "duration": 14,
              "children": [],
              "type": "Interaction",
              "startedAt": "2026-10-26T04:36:47.151Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/step-definitions/camila-e2e.steps.ts",
                "line": 164,
                "column": 49
              },
              "artifacts": [
                {
                  "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-ana-ensures-that-the-text-of-aviso-e4e80ab9cb.png",
                  "type": "screenshot"
                }
              ]
            }
          ],
          "type": "Task",
          "startedAt": "2026-10-26T04:36:47.149Z",
          "location": {
            "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila-e2e.feature",
            "line": 108
          }
        },
        {
          "name": "Y el buzón debe guardar 0 mensajes",
          "outcome": "SUCCESS",
          "duration": 53,
          "children": [
            {
              "name": "Ana ensures that los mensajes guardados en el buzón does eventually equal 0",
              "outcome": "SUCCESS",
              "duration": 16,
              "children": [],
              "type": "Interaction",
              "startedAt": "2026-10-26T04:36:47.214Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/step-definitions/camila-e2e.steps.ts",
                "line": 139,
                "column": 49
              },
              "artifacts": [
                {
                  "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-ana-ensures-that-los-mensajes-guar-e4e80ab9cb.png",
                  "type": "screenshot"
                }
              ]
            }
          ],
          "type": "Task",
          "startedAt": "2026-10-26T04:36:47.212Z",
          "location": {
            "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila-e2e.feature",
            "line": 109
          }
        },
        {
          "name": "After",
          "outcome": "SUCCESS",
          "duration": 1,
          "children": [],
          "type": "Task",
          "startedAt": "2026-10-26T04:36:47.266Z",
          "location": {
            "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/actors.ts",
            "line": 52
          }
        }
      ],
      "executionHistory": [
        {
          "outcome": "SUCCESS",
          "run": "2026-10-26T04-36-24.665Z",
          "timestamp": "2026-10-26T04:36:24.312Z",
          "duration": 2581,
          "activities": [
            {
              "name": "Before",
              "outcome": "SUCCESS",
              "duration": 274,
              "children": [
                {
                  "name": "Preparador deja la base de datos sin usuarios, reservas ni mensajes",
                  "outcome": "SUCCESS",
                  "duration": 6,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:44.714Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/actors.ts",
                    "line": 47,
                    "column": 25
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-preparador-deja-la-base-de-datos-s-40ad070d69.png",
                      "type": "screenshot"
                    }
                  ]
                },
                {
                  "name": "Preparador registra la cuenta ana.admin@udemedellin.edu.co",
                  "outcome": "SUCCESS",
                  "duration": 22,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:44.795Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/actors.ts",
                    "line": 48,
                    "column": 60
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-preparador-registra-la-cuenta-ana--40ad070d69.png",
                      "type": "screenshot"
                    }
                  ]
                },
                {
                  "name": "Preparador registra la cuenta tomas.coach@udem.edu.co",
                  "outcome": "SUCCESS",
                  "duration": 23,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:44.842Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/actors.ts",
                    "line": 48,
                    "column": 60
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-preparador-registra-la-cuenta-toma-40ad070d69.png",
                      "type": "screenshot"
                    }
                  ]
                },
                {
                  "name": "Preparador registra la cuenta laura.est@soyudemedellin.edu.co",
                  "outcome": "SUCCESS",
                  "duration": 21,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:44.887Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/actors.ts",
                    "line": 48,
                    "column": 60
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-preparador-registra-la-cuenta-laur-40ad070d69.png",
                      "type": "screenshot"
                    }
                  ]
                },
                {
                  "name": "Preparador registra la cuenta mateo.est@soyudemedellin.edu.co",
                  "outcome": "SUCCESS",
                  "duration": 21,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:44.943Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/actors.ts",
                    "line": 48,
                    "column": 60
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-preparador-registra-la-cuenta-mate-40ad070d69.png",
                      "type": "screenshot"
                    }
                  ]
                }
              ],
              "type": "Task",
              "startedAt": "2026-10-26T04:36:44.712Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/actors.ts",
                "line": 33
              }
            },
            {
              "name": "Dado que Laura dejó en el buzón el mensaje \"No carga el historial.\"",
              "outcome": "SUCCESS",
              "duration": 54,
              "children": [
                {
                  "name": "Preparador deja en el buzón el mensaje \"No carga el historial.\"",
                  "outcome": "SUCCESS",
                  "duration": 28,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:44.987Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/step-definitions/camila-e2e.steps.ts",
                    "line": 27,
                    "column": 68
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-preparador-deja-en-el-buz-n-el-men-40ad070d69.png",
                      "type": "screenshot"
                    }
                  ]
                }
              ],
              "type": "Task",
              "startedAt": "2026-10-26T04:36:44.986Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila-e2e.feature",
                "line": 101
              }
            },
            {
              "name": "Y que Ana entró a la aplicación",
              "outcome": "SUCCESS",
              "duration": 804,
              "children": [
                {
                  "name": "Ana inicia sesión como ana.admin@udemedellin.edu.co",
                  "outcome": "SUCCESS",
                  "duration": 735,
                  "children": [
                    {
                      "name": "Ana navigates to \"http://localhost:5174\"",
                      "outcome": "SUCCESS",
                      "duration": 77,
                      "children": [],
                      "type": "Interaction",
                      "startedAt": "2026-10-26T04:36:45.044Z",
                      "location": {
                        "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/step-definitions/camila-e2e.steps.ts",
                        "line": 35,
                        "column": 54
                      },
                      "artifacts": [
                        {
                          "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-ana-navigates-to--http---localhost-891de9ff46.png",
                          "type": "screenshot"
                        }
                      ]
                    },
                    {
                      "name": "Ana enters \"ana.admin@udemedellin.edu.co\" into campo correo",
                      "outcome": "SUCCESS",
                      "duration": 10,
                      "children": [],
                      "type": "Interaction",
                      "startedAt": "2026-10-26T04:36:45.189Z",
                      "location": {
                        "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/tasks.ts",
                        "line": 15,
                        "column": 36
                      },
                      "artifacts": [
                        {
                          "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-ana-enters--ana-admin-udemedellin--c56eff6028.png",
                          "type": "screenshot"
                        }
                      ]
                    },
                    {
                      "name": "Ana enters \"1000000001\" into campo documento (contraseña)",
                      "outcome": "SUCCESS",
                      "duration": 75,
                      "children": [],
                      "type": "Interaction",
                      "startedAt": "2026-10-26T04:36:45.257Z",
                      "location": {
                        "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/tasks.ts",
                        "line": 16,
                        "column": 40
                      },
                      "artifacts": [
                        {
                          "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-ana-enters--1000000001--into-campo-216bfb1a41.png",
                          "type": "screenshot"
                        }
                      ]
                    },
                    {
                      "name": "Ana clicks on botón ingresar",
                      "outcome": "SUCCESS",
                      "duration": 344,
                      "children": [],
                      "type": "Interaction",
                      "startedAt": "2026-10-26T04:36:45.389Z",
                      "location": {
                        "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/tasks.ts",
                        "line": 17,
                        "column": 13
                      },
                      "artifacts": [
                        {
                          "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-ana-clicks-on-bot-n-ingresar-cfe117b195.png",
                          "type": "screenshot"
                        }
                      ]
                    }
                  ],
                  "type": "Task",
                  "startedAt": "2026-10-26T04:36:45.044Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/step-definitions/camila-e2e.steps.ts",
                    "line": 35,
                    "column": 54
                  }
                },
                {
                  "name": "Ana waits until botón Perfil does become visible",
                  "outcome": "SUCCESS",
                  "duration": 19,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:45.791Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/step-definitions/camila-e2e.steps.ts",
                    "line": 35,
                    "column": 78
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-ana-waits-until-bot-n-perfil-does--34c24aad71.png",
                      "type": "screenshot"
                    }
                  ]
                }
              ],
              "type": "Task",
              "startedAt": "2026-10-26T04:36:45.040Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila-e2e.feature",
                "line": 102
              }
            },
            {
              "name": "Cuando abre el buzón de sugerencias",
              "outcome": "SUCCESS",
              "duration": 269,
              "children": [
                {
                  "name": "Ana abre el buzón de sugerencias",
                  "outcome": "SUCCESS",
                  "duration": 253,
                  "children": [
                    {
                      "name": "Ana waits until botón Usuarios does become visible",
                      "outcome": "SUCCESS",
                      "duration": 18,
                      "children": [],
                      "type": "Interaction",
                      "startedAt": "2026-10-26T04:36:45.847Z",
                      "location": {
                        "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/tasks.ts",
                        "line": 66,
                        "column": 53
                      },
                      "artifacts": [
                        {
                          "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-ana-waits-until-bot-n-usuarios-doe-56cae6b897.png",
                          "type": "screenshot"
                        }
                      ]
                    },
                    {
                      "name": "Ana clicks on botón Usuarios",
                      "outcome": "SUCCESS",
                      "duration": 60,
                      "children": [],
                      "type": "Interaction",
                      "startedAt": "2026-10-26T04:36:45.912Z",
                      "location": {
                        "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/tasks.ts",
                        "line": 66,
                        "column": 84
                      },
                      "artifacts": [
                        {
                          "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-ana-clicks-on-bot-n-usuarios-218c857182.png",
                          "type": "screenshot"
                        }
                      ]
                    },
                    {
                      "name": "Ana waits until contador del buzón does become visible",
                      "outcome": "SUCCESS",
                      "duration": 21,
                      "children": [],
                      "type": "Interaction",
                      "startedAt": "2026-10-26T04:36:46.008Z",
                      "location": {
                        "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/tasks.ts",
                        "line": 66,
                        "column": 104
                      },
                      "artifacts": [
                        {
                          "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-ana-waits-until-contador-del-buz-n-be23cce350.png",
                          "type": "screenshot"
                        }
                      ]
                    }
                  ],
                  "type": "Task",
                  "startedAt": "2026-10-26T04:36:45.847Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/step-definitions/camila-e2e.steps.ts",
                    "line": 144,
                    "column": 54
                  }
                }
              ],
              "type": "Task",
              "startedAt": "2026-10-26T04:36:45.844Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila-e2e.feature",
                "line": 103
              }
            },
            {
              "name": "Entonces el buzón debe mostrar 1 mensajes",
              "outcome": "SUCCESS",
              "duration": 62,
              "children": [
                {
                  "name": "Ana ensures that the text of contador del buzón does eventually equal \"1\"",
                  "outcome": "SUCCESS",
                  "duration": 14,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:46.115Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/step-definitions/camila-e2e.steps.ts",
                    "line": 156,
                    "column": 49
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-ana-ensures-that-the-text-of-conta-0bf0c5ed37.png",
                      "type": "screenshot"
                    }
                  ]
                }
              ],
              "type": "Task",
              "startedAt": "2026-10-26T04:36:46.113Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila-e2e.feature",
                "line": 104
              }
            },
            {
              "name": "Y debe ver en el buzón el mensaje \"No carga el historial.\"",
              "outcome": "SUCCESS",
              "duration": 87,
              "children": [
                {
                  "name": "Ana ensures that the text of mensajes del buzón does eventually contain at least one item that does include \"No carga el historial.\"",
                  "outcome": "SUCCESS",
                  "duration": 16,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:46.178Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/step-definitions/camila-e2e.steps.ts",
                    "line": 160,
                    "column": 49
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-ana-ensures-that-the-text-of-mensa-bd997ada09.png",
                      "type": "screenshot"
                    }
                  ]
                }
              ],
              "type": "Task",
              "startedAt": "2026-10-26T04:36:46.176Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila-e2e.feature",
                "line": 105
              }
            },
            {
              "name": "Cuando borra el primer mensaje y confirma",
              "outcome": "SUCCESS",
              "duration": 247,
              "children": [
                {
                  "name": "Ana borra el primer mensaje del buzón y confirma",
                  "outcome": "SUCCESS",
                  "duration": 234,
                  "children": [
                    {
                      "name": "Ana performs bound QuestionStatement",
                      "outcome": "SUCCESS",
                      "duration": 0,
                      "children": [],
                      "type": "Interaction",
                      "startedAt": "2026-10-26T04:36:46.266Z",
                      "location": {
                        "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/node_modules/@serenity-js/web/src/screenplay/models/dialogs/ModalDialog.ts",
                        "line": 135,
                        "column": 45
                      },
                      "artifacts": [
                        {
                          "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-ana-accepts-next-modal-dialog-wind-82f740f7f4.png",
                          "type": "screenshot"
                        }
                      ]
                    },
                    {
                      "name": "Ana clicks on botón Borrar del primer mensaje",
                      "outcome": "SUCCESS",
                      "duration": 143,
                      "children": [],
                      "type": "Interaction",
                      "startedAt": "2026-10-26T04:36:46.311Z",
                      "location": {
                        "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/tasks.ts",
                        "line": 69,
                        "column": 101
                      },
                      "artifacts": [
                        {
                          "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-ana-clicks-on-bot-n-borrar-del-pri-80a1f0a6e5.png",
                          "type": "screenshot"
                        }
                      ]
                    }
                  ],
                  "type": "Task",
                  "startedAt": "2026-10-26T04:36:46.265Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/step-definitions/camila-e2e.steps.ts",
                    "line": 152,
                    "column": 63
                  }
                }
              ],
              "type": "Task",
              "startedAt": "2026-10-26T04:36:46.263Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila-e2e.feature",
                "line": 106
              }
            },
            {
              "name": "Entonces debe aparecer el aviso \"Mensaje borrado del buzón\"",
              "outcome": "SUCCESS",
              "duration": 639,
              "children": [
                {
                  "name": "Ana waits until mensaje del aviso does become visible",
                  "outcome": "SUCCESS",
                  "duration": 529,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:46.513Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/step-definitions/camila-e2e.steps.ts",
                    "line": 169,
                    "column": 42
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-ana-waits-until-mensaje-del-aviso--e4e80ab9cb.png",
                      "type": "screenshot"
                    }
                  ]
                },
                {
                  "name": "Ana ensures that the text of mensaje del aviso does eventually include \"Mensaje borrado del buzón\"",
                  "outcome": "SUCCESS",
                  "duration": 14,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:47.088Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/step-definitions/camila-e2e.steps.ts",
                    "line": 169,
                    "column": 66
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-ana-ensures-that-the-text-of-mensa-e4e80ab9cb.png",
                      "type": "screenshot"
                    }
                  ]
                }
              ],
              "type": "Task",
              "startedAt": "2026-10-26T04:36:46.510Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila-e2e.feature",
                "line": 107
              }
            },
            {
              "name": "Y debe ver el aviso de buzón vacío \"Todavía no hay mensajes\"",
              "outcome": "SUCCESS",
              "duration": 63,
              "children": [
                {
                  "name": "Ana ensures that the text of aviso de buzón vacío does eventually include \"Todavía no hay mensajes\"",
                  "outcome": "SUCCESS",
                  "duration": 14,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:47.151Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/step-definitions/camila-e2e.steps.ts",
                    "line": 164,
                    "column": 49
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-ana-ensures-that-the-text-of-aviso-e4e80ab9cb.png",
                      "type": "screenshot"
                    }
                  ]
                }
              ],
              "type": "Task",
              "startedAt": "2026-10-26T04:36:47.149Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila-e2e.feature",
                "line": 108
              }
            },
            {
              "name": "Y el buzón debe guardar 0 mensajes",
              "outcome": "SUCCESS",
              "duration": 53,
              "children": [
                {
                  "name": "Ana ensures that los mensajes guardados en el buzón does eventually equal 0",
                  "outcome": "SUCCESS",
                  "duration": 16,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:47.214Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/step-definitions/camila-e2e.steps.ts",
                    "line": 139,
                    "column": 49
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-ana-ensures-that-los-mensajes-guar-e4e80ab9cb.png",
                      "type": "screenshot"
                    }
                  ]
                }
              ],
              "type": "Task",
              "startedAt": "2026-10-26T04:36:47.212Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila-e2e.feature",
                "line": 109
              }
            },
            {
              "name": "After",
              "outcome": "SUCCESS",
              "duration": 1,
              "children": [],
              "type": "Task",
              "startedAt": "2026-10-26T04:36:47.266Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/actors.ts",
                "line": 52
              }
            }
          ]
        }
      ],
      "narrative": "<p>Como entrenador, administradora o estudiante del gimnasio UdeM\nQuiero usar la interfaz web\nPara comprobar los requisitos RF11, RF12, RF13, RF16, RF20 y RF21</p>\n",
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
          "name": "Ana",
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
      "id": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila-e2e.feature:100"
    },
    {
      "name": "Recorrido completo del buzón entre estudiante y administradora (RF20 + RF21)",
      "category": "E2E de navegador - asistencia, cierre de jornada, registro diario y buzón",
      "outcome": "SUCCESS",
      "duration": 3383,
      "startedAt": "2026-10-26T04:36:47.294Z",
      "source": {
        "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila-e2e.feature",
        "line": 112
      },
      "tags": [
        {
          "type": "feature",
          "name": "E2E de navegador - asistencia, cierre de jornada, registro diario y buzón"
        },
        {
          "type": "tag",
          "name": "camila"
        },
        {
          "type": "tag",
          "name": "rf20"
        },
        {
          "type": "tag",
          "name": "rf21"
        }
      ],
      "activities": [
        {
          "name": "Before",
          "outcome": "SUCCESS",
          "duration": 263,
          "children": [
            {
              "name": "Preparador deja la base de datos sin usuarios, reservas ni mensajes",
              "outcome": "SUCCESS",
              "duration": 5,
              "children": [],
              "type": "Interaction",
              "startedAt": "2026-10-26T04:36:47.296Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/actors.ts",
                "line": 47,
                "column": 25
              },
              "artifacts": [
                {
                  "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-preparador-deja-la-base-de-datos-s-40ad070d69.png",
                  "type": "screenshot"
                }
              ]
            },
            {
              "name": "Preparador registra la cuenta ana.admin@udemedellin.edu.co",
              "outcome": "SUCCESS",
              "duration": 23,
              "children": [],
              "type": "Interaction",
              "startedAt": "2026-10-26T04:36:47.358Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/actors.ts",
                "line": 48,
                "column": 60
              },
              "artifacts": [
                {
                  "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-preparador-registra-la-cuenta-ana--40ad070d69.png",
                  "type": "screenshot"
                }
              ]
            },
            {
              "name": "Preparador registra la cuenta tomas.coach@udem.edu.co",
              "outcome": "SUCCESS",
              "duration": 22,
              "children": [],
              "type": "Interaction",
              "startedAt": "2026-10-26T04:36:47.405Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/actors.ts",
                "line": 48,
                "column": 60
              },
              "artifacts": [
                {
                  "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-preparador-registra-la-cuenta-toma-40ad070d69.png",
                  "type": "screenshot"
                }
              ]
            },
            {
              "name": "Preparador registra la cuenta laura.est@soyudemedellin.edu.co",
              "outcome": "SUCCESS",
              "duration": 23,
              "children": [],
              "type": "Interaction",
              "startedAt": "2026-10-26T04:36:47.450Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/actors.ts",
                "line": 48,
                "column": 60
              },
              "artifacts": [
                {
                  "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-preparador-registra-la-cuenta-laur-40ad070d69.png",
                  "type": "screenshot"
                }
              ]
            },
            {
              "name": "Preparador registra la cuenta mateo.est@soyudemedellin.edu.co",
              "outcome": "SUCCESS",
              "duration": 24,
              "children": [],
              "type": "Interaction",
              "startedAt": "2026-10-26T04:36:47.509Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/actors.ts",
                "line": 48,
                "column": 60
              },
              "artifacts": [
                {
                  "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-preparador-registra-la-cuenta-mate-40ad070d69.png",
                  "type": "screenshot"
                }
              ]
            }
          ],
          "type": "Task",
          "startedAt": "2026-10-26T04:36:47.294Z",
          "location": {
            "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/actors.ts",
            "line": 33
          }
        },
        {
          "name": "Dado que Laura entró a la aplicación",
          "outcome": "SUCCESS",
          "duration": 770,
          "children": [
            {
              "name": "Laura inicia sesión como laura.est@soyudemedellin.edu.co",
              "outcome": "SUCCESS",
              "duration": 699,
              "children": [
                {
                  "name": "Laura navigates to \"http://localhost:5174\"",
                  "outcome": "SUCCESS",
                  "duration": 75,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:47.561Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/step-definitions/camila-e2e.steps.ts",
                    "line": 35,
                    "column": 54
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-laura-navigates-to--http---localho-676377ade5.png",
                      "type": "screenshot"
                    }
                  ]
                },
                {
                  "name": "Laura enters \"laura.est@soyudemedellin.edu.co\" into campo correo",
                  "outcome": "SUCCESS",
                  "duration": 11,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:47.695Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/tasks.ts",
                    "line": 15,
                    "column": 36
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-laura-enters--laura-est-soyudemede-f962f152ad.png",
                      "type": "screenshot"
                    }
                  ]
                },
                {
                  "name": "Laura enters \"1000000003\" into campo documento (contraseña)",
                  "outcome": "SUCCESS",
                  "duration": 46,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:47.752Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/tasks.ts",
                    "line": 16,
                    "column": 40
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-laura-enters--1000000003--into-cam-ebe4fbc081.png",
                      "type": "screenshot"
                    }
                  ]
                },
                {
                  "name": "Laura clicks on botón ingresar",
                  "outcome": "SUCCESS",
                  "duration": 360,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:47.865Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/tasks.ts",
                    "line": 17,
                    "column": 13
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-laura-clicks-on-bot-n-ingresar-aa8a41dcdd.png",
                      "type": "screenshot"
                    }
                  ]
                }
              ],
              "type": "Task",
              "startedAt": "2026-10-26T04:36:47.561Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/step-definitions/camila-e2e.steps.ts",
                "line": 35,
                "column": 54
              }
            },
            {
              "name": "Laura waits until botón Perfil does become visible",
              "outcome": "SUCCESS",
              "duration": 21,
              "children": [],
              "type": "Interaction",
              "startedAt": "2026-10-26T04:36:48.272Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/step-definitions/camila-e2e.steps.ts",
                "line": 35,
                "column": 78
              },
              "artifacts": [
                {
                  "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-laura-waits-until-bot-n-perfil-doe-4c1e2296fd.png",
                  "type": "screenshot"
                }
              ]
            }
          ],
          "type": "Task",
          "startedAt": "2026-10-26T04:36:47.557Z",
          "location": {
            "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila-e2e.feature",
            "line": 113
          }
        },
        {
          "name": "Y envía al administrador el mensaje \"Sugiero agregar un bloque a las 18:00.\"",
          "outcome": "SUCCESS",
          "duration": 1257,
          "children": [
            {
              "name": "Laura envía al administrador el mensaje \"Sugiero agregar un bloque a las 18:00.\"",
              "outcome": "SUCCESS",
              "duration": 666,
              "children": [
                {
                  "name": "Laura waits until botón Historial does become visible",
                  "outcome": "SUCCESS",
                  "duration": 19,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:48.332Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/tasks.ts",
                    "line": 57,
                    "column": 7
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-laura-waits-until-bot-n-historial--ba13c586f7.png",
                      "type": "screenshot"
                    }
                  ]
                },
                {
                  "name": "Laura clicks on botón Historial",
                  "outcome": "SUCCESS",
                  "duration": 73,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:48.399Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/tasks.ts",
                    "line": 58,
                    "column": 13
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-laura-clicks-on-bot-n-historial-6354cbbd6c.png",
                      "type": "screenshot"
                    }
                  ]
                },
                {
                  "name": "Laura enters \"Sugiero agregar un bloque a las 18:00.\" into campo del mensaje",
                  "outcome": "SUCCESS",
                  "duration": 3,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:48.506Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/tasks.ts",
                    "line": 59,
                    "column": 31
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-laura-enters--sugiero-agregar-un-b-ee2a7e2131.png",
                      "type": "screenshot"
                    }
                  ]
                },
                {
                  "name": "Laura clicks on botón Enviar al administrador",
                  "outcome": "SUCCESS",
                  "duration": 410,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:48.545Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/tasks.ts",
                    "line": 60,
                    "column": 13
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-laura-clicks-on-bot-n-enviar-al-ad-3931a6eb30.png",
                      "type": "screenshot"
                    }
                  ]
                }
              ],
              "type": "Task",
              "startedAt": "2026-10-26T04:36:48.332Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/step-definitions/camila-e2e.steps.ts",
                "line": 127,
                "column": 59
              }
            },
            {
              "name": "Laura waits until mensaje del aviso does become visible",
              "outcome": "SUCCESS",
              "duration": 529,
              "children": [],
              "type": "Interaction",
              "startedAt": "2026-10-26T04:36:49.010Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/step-definitions/camila-e2e.steps.ts",
                "line": 127,
                "column": 82
              },
              "artifacts": [
                {
                  "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-laura-waits-until-mensaje-del-avis-8f21aed951.png",
                  "type": "screenshot"
                }
              ]
            }
          ],
          "type": "Task",
          "startedAt": "2026-10-26T04:36:48.327Z",
          "location": {
            "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila-e2e.feature",
            "line": 114
          }
        },
        {
          "name": "Cuando Ana inicia sesión y abre el buzón de sugerencias",
          "outcome": "SUCCESS",
          "duration": 994,
          "children": [
            {
              "name": "Ana inicia sesión como ana.admin@udemedellin.edu.co",
              "outcome": "SUCCESS",
              "duration": 709,
              "children": [
                {
                  "name": "Ana navigates to \"http://localhost:5174\"",
                  "outcome": "SUCCESS",
                  "duration": 87,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:49.590Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/step-definitions/camila-e2e.steps.ts",
                    "line": 148,
                    "column": 54
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-ana-navigates-to--http---localhost-676377ade5.png",
                      "type": "screenshot"
                    }
                  ]
                },
                {
                  "name": "Ana enters \"ana.admin@udemedellin.edu.co\" into campo correo",
                  "outcome": "SUCCESS",
                  "duration": 10,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:49.736Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/tasks.ts",
                    "line": 15,
                    "column": 36
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-ana-enters--ana-admin-udemedellin--37ccf70ccf.png",
                      "type": "screenshot"
                    }
                  ]
                },
                {
                  "name": "Ana enters \"1000000001\" into campo documento (contraseña)",
                  "outcome": "SUCCESS",
                  "duration": 63,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:49.804Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/tasks.ts",
                    "line": 16,
                    "column": 40
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-ana-enters--1000000001--into-campo-7ad4f6ea05.png",
                      "type": "screenshot"
                    }
                  ]
                },
                {
                  "name": "Ana clicks on botón ingresar",
                  "outcome": "SUCCESS",
                  "duration": 350,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:49.913Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/tasks.ts",
                    "line": 17,
                    "column": 13
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-ana-clicks-on-bot-n-ingresar-815a32d793.png",
                      "type": "screenshot"
                    }
                  ]
                }
              ],
              "type": "Task",
              "startedAt": "2026-10-26T04:36:49.589Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/step-definitions/camila-e2e.steps.ts",
                "line": 148,
                "column": 54
              }
            },
            {
              "name": "Ana abre el buzón de sugerencias",
              "outcome": "SUCCESS",
              "duration": 258,
              "children": [
                {
                  "name": "Ana waits until botón Usuarios does become visible",
                  "outcome": "SUCCESS",
                  "duration": 20,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:50.309Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/tasks.ts",
                    "line": 66,
                    "column": 53
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-ana-waits-until-bot-n-usuarios-doe-a78f4cb309.png",
                      "type": "screenshot"
                    }
                  ]
                },
                {
                  "name": "Ana clicks on botón Usuarios",
                  "outcome": "SUCCESS",
                  "duration": 72,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:50.374Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/tasks.ts",
                    "line": 66,
                    "column": 84
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-ana-clicks-on-bot-n-usuarios-218c857182.png",
                      "type": "screenshot"
                    }
                  ]
                },
                {
                  "name": "Ana waits until contador del buzón does become visible",
                  "outcome": "SUCCESS",
                  "duration": 18,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:50.480Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/tasks.ts",
                    "line": 66,
                    "column": 104
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-ana-waits-until-contador-del-buz-n-71f4ddf9c2.png",
                      "type": "screenshot"
                    }
                  ]
                }
              ],
              "type": "Task",
              "startedAt": "2026-10-26T04:36:50.309Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/step-definitions/camila-e2e.steps.ts",
                "line": 148,
                "column": 90
              }
            }
          ],
          "type": "Task",
          "startedAt": "2026-10-26T04:36:49.584Z",
          "location": {
            "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila-e2e.feature",
            "line": 115
          }
        },
        {
          "name": "Entonces debe ver en el buzón el mensaje \"Sugiero agregar un bloque a las 18:00.\"",
          "outcome": "SUCCESS",
          "duration": 73,
          "children": [
            {
              "name": "Ana ensures that the text of mensajes del buzón does eventually contain at least one item that does include \"Sugiero agregar un bloque a las 18:00.\"",
              "outcome": "SUCCESS",
              "duration": 16,
              "children": [],
              "type": "Interaction",
              "startedAt": "2026-10-26T04:36:50.580Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/step-definitions/camila-e2e.steps.ts",
                "line": 160,
                "column": 49
              },
              "artifacts": [
                {
                  "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-ana-ensures-that-the-text-of-mensa-27b5a79719.png",
                  "type": "screenshot"
                }
              ]
            }
          ],
          "type": "Task",
          "startedAt": "2026-10-26T04:36:50.578Z",
          "location": {
            "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila-e2e.feature",
            "line": 116
          }
        },
        {
          "name": "After",
          "outcome": "SUCCESS",
          "duration": 0,
          "children": [],
          "type": "Task",
          "startedAt": "2026-10-26T04:36:50.652Z",
          "location": {
            "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/actors.ts",
            "line": 52
          }
        }
      ],
      "executionHistory": [
        {
          "outcome": "SUCCESS",
          "run": "2026-10-26T04-36-24.665Z",
          "timestamp": "2026-10-26T04:36:24.312Z",
          "duration": 3383,
          "activities": [
            {
              "name": "Before",
              "outcome": "SUCCESS",
              "duration": 263,
              "children": [
                {
                  "name": "Preparador deja la base de datos sin usuarios, reservas ni mensajes",
                  "outcome": "SUCCESS",
                  "duration": 5,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:47.296Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/actors.ts",
                    "line": 47,
                    "column": 25
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-preparador-deja-la-base-de-datos-s-40ad070d69.png",
                      "type": "screenshot"
                    }
                  ]
                },
                {
                  "name": "Preparador registra la cuenta ana.admin@udemedellin.edu.co",
                  "outcome": "SUCCESS",
                  "duration": 23,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:47.358Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/actors.ts",
                    "line": 48,
                    "column": 60
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-preparador-registra-la-cuenta-ana--40ad070d69.png",
                      "type": "screenshot"
                    }
                  ]
                },
                {
                  "name": "Preparador registra la cuenta tomas.coach@udem.edu.co",
                  "outcome": "SUCCESS",
                  "duration": 22,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:47.405Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/actors.ts",
                    "line": 48,
                    "column": 60
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-preparador-registra-la-cuenta-toma-40ad070d69.png",
                      "type": "screenshot"
                    }
                  ]
                },
                {
                  "name": "Preparador registra la cuenta laura.est@soyudemedellin.edu.co",
                  "outcome": "SUCCESS",
                  "duration": 23,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:47.450Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/actors.ts",
                    "line": 48,
                    "column": 60
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-preparador-registra-la-cuenta-laur-40ad070d69.png",
                      "type": "screenshot"
                    }
                  ]
                },
                {
                  "name": "Preparador registra la cuenta mateo.est@soyudemedellin.edu.co",
                  "outcome": "SUCCESS",
                  "duration": 24,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:47.509Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/actors.ts",
                    "line": 48,
                    "column": 60
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-preparador-registra-la-cuenta-mate-40ad070d69.png",
                      "type": "screenshot"
                    }
                  ]
                }
              ],
              "type": "Task",
              "startedAt": "2026-10-26T04:36:47.294Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/actors.ts",
                "line": 33
              }
            },
            {
              "name": "Dado que Laura entró a la aplicación",
              "outcome": "SUCCESS",
              "duration": 770,
              "children": [
                {
                  "name": "Laura inicia sesión como laura.est@soyudemedellin.edu.co",
                  "outcome": "SUCCESS",
                  "duration": 699,
                  "children": [
                    {
                      "name": "Laura navigates to \"http://localhost:5174\"",
                      "outcome": "SUCCESS",
                      "duration": 75,
                      "children": [],
                      "type": "Interaction",
                      "startedAt": "2026-10-26T04:36:47.561Z",
                      "location": {
                        "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/step-definitions/camila-e2e.steps.ts",
                        "line": 35,
                        "column": 54
                      },
                      "artifacts": [
                        {
                          "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-laura-navigates-to--http---localho-676377ade5.png",
                          "type": "screenshot"
                        }
                      ]
                    },
                    {
                      "name": "Laura enters \"laura.est@soyudemedellin.edu.co\" into campo correo",
                      "outcome": "SUCCESS",
                      "duration": 11,
                      "children": [],
                      "type": "Interaction",
                      "startedAt": "2026-10-26T04:36:47.695Z",
                      "location": {
                        "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/tasks.ts",
                        "line": 15,
                        "column": 36
                      },
                      "artifacts": [
                        {
                          "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-laura-enters--laura-est-soyudemede-f962f152ad.png",
                          "type": "screenshot"
                        }
                      ]
                    },
                    {
                      "name": "Laura enters \"1000000003\" into campo documento (contraseña)",
                      "outcome": "SUCCESS",
                      "duration": 46,
                      "children": [],
                      "type": "Interaction",
                      "startedAt": "2026-10-26T04:36:47.752Z",
                      "location": {
                        "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/tasks.ts",
                        "line": 16,
                        "column": 40
                      },
                      "artifacts": [
                        {
                          "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-laura-enters--1000000003--into-cam-ebe4fbc081.png",
                          "type": "screenshot"
                        }
                      ]
                    },
                    {
                      "name": "Laura clicks on botón ingresar",
                      "outcome": "SUCCESS",
                      "duration": 360,
                      "children": [],
                      "type": "Interaction",
                      "startedAt": "2026-10-26T04:36:47.865Z",
                      "location": {
                        "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/tasks.ts",
                        "line": 17,
                        "column": 13
                      },
                      "artifacts": [
                        {
                          "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-laura-clicks-on-bot-n-ingresar-aa8a41dcdd.png",
                          "type": "screenshot"
                        }
                      ]
                    }
                  ],
                  "type": "Task",
                  "startedAt": "2026-10-26T04:36:47.561Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/step-definitions/camila-e2e.steps.ts",
                    "line": 35,
                    "column": 54
                  }
                },
                {
                  "name": "Laura waits until botón Perfil does become visible",
                  "outcome": "SUCCESS",
                  "duration": 21,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:48.272Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/step-definitions/camila-e2e.steps.ts",
                    "line": 35,
                    "column": 78
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-laura-waits-until-bot-n-perfil-doe-4c1e2296fd.png",
                      "type": "screenshot"
                    }
                  ]
                }
              ],
              "type": "Task",
              "startedAt": "2026-10-26T04:36:47.557Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila-e2e.feature",
                "line": 113
              }
            },
            {
              "name": "Y envía al administrador el mensaje \"Sugiero agregar un bloque a las 18:00.\"",
              "outcome": "SUCCESS",
              "duration": 1257,
              "children": [
                {
                  "name": "Laura envía al administrador el mensaje \"Sugiero agregar un bloque a las 18:00.\"",
                  "outcome": "SUCCESS",
                  "duration": 666,
                  "children": [
                    {
                      "name": "Laura waits until botón Historial does become visible",
                      "outcome": "SUCCESS",
                      "duration": 19,
                      "children": [],
                      "type": "Interaction",
                      "startedAt": "2026-10-26T04:36:48.332Z",
                      "location": {
                        "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/tasks.ts",
                        "line": 57,
                        "column": 7
                      },
                      "artifacts": [
                        {
                          "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-laura-waits-until-bot-n-historial--ba13c586f7.png",
                          "type": "screenshot"
                        }
                      ]
                    },
                    {
                      "name": "Laura clicks on botón Historial",
                      "outcome": "SUCCESS",
                      "duration": 73,
                      "children": [],
                      "type": "Interaction",
                      "startedAt": "2026-10-26T04:36:48.399Z",
                      "location": {
                        "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/tasks.ts",
                        "line": 58,
                        "column": 13
                      },
                      "artifacts": [
                        {
                          "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-laura-clicks-on-bot-n-historial-6354cbbd6c.png",
                          "type": "screenshot"
                        }
                      ]
                    },
                    {
                      "name": "Laura enters \"Sugiero agregar un bloque a las 18:00.\" into campo del mensaje",
                      "outcome": "SUCCESS",
                      "duration": 3,
                      "children": [],
                      "type": "Interaction",
                      "startedAt": "2026-10-26T04:36:48.506Z",
                      "location": {
                        "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/tasks.ts",
                        "line": 59,
                        "column": 31
                      },
                      "artifacts": [
                        {
                          "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-laura-enters--sugiero-agregar-un-b-ee2a7e2131.png",
                          "type": "screenshot"
                        }
                      ]
                    },
                    {
                      "name": "Laura clicks on botón Enviar al administrador",
                      "outcome": "SUCCESS",
                      "duration": 410,
                      "children": [],
                      "type": "Interaction",
                      "startedAt": "2026-10-26T04:36:48.545Z",
                      "location": {
                        "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/tasks.ts",
                        "line": 60,
                        "column": 13
                      },
                      "artifacts": [
                        {
                          "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-laura-clicks-on-bot-n-enviar-al-ad-3931a6eb30.png",
                          "type": "screenshot"
                        }
                      ]
                    }
                  ],
                  "type": "Task",
                  "startedAt": "2026-10-26T04:36:48.332Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/step-definitions/camila-e2e.steps.ts",
                    "line": 127,
                    "column": 59
                  }
                },
                {
                  "name": "Laura waits until mensaje del aviso does become visible",
                  "outcome": "SUCCESS",
                  "duration": 529,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:49.010Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/step-definitions/camila-e2e.steps.ts",
                    "line": 127,
                    "column": 82
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-laura-waits-until-mensaje-del-avis-8f21aed951.png",
                      "type": "screenshot"
                    }
                  ]
                }
              ],
              "type": "Task",
              "startedAt": "2026-10-26T04:36:48.327Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila-e2e.feature",
                "line": 114
              }
            },
            {
              "name": "Cuando Ana inicia sesión y abre el buzón de sugerencias",
              "outcome": "SUCCESS",
              "duration": 994,
              "children": [
                {
                  "name": "Ana inicia sesión como ana.admin@udemedellin.edu.co",
                  "outcome": "SUCCESS",
                  "duration": 709,
                  "children": [
                    {
                      "name": "Ana navigates to \"http://localhost:5174\"",
                      "outcome": "SUCCESS",
                      "duration": 87,
                      "children": [],
                      "type": "Interaction",
                      "startedAt": "2026-10-26T04:36:49.590Z",
                      "location": {
                        "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/step-definitions/camila-e2e.steps.ts",
                        "line": 148,
                        "column": 54
                      },
                      "artifacts": [
                        {
                          "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-ana-navigates-to--http---localhost-676377ade5.png",
                          "type": "screenshot"
                        }
                      ]
                    },
                    {
                      "name": "Ana enters \"ana.admin@udemedellin.edu.co\" into campo correo",
                      "outcome": "SUCCESS",
                      "duration": 10,
                      "children": [],
                      "type": "Interaction",
                      "startedAt": "2026-10-26T04:36:49.736Z",
                      "location": {
                        "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/tasks.ts",
                        "line": 15,
                        "column": 36
                      },
                      "artifacts": [
                        {
                          "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-ana-enters--ana-admin-udemedellin--37ccf70ccf.png",
                          "type": "screenshot"
                        }
                      ]
                    },
                    {
                      "name": "Ana enters \"1000000001\" into campo documento (contraseña)",
                      "outcome": "SUCCESS",
                      "duration": 63,
                      "children": [],
                      "type": "Interaction",
                      "startedAt": "2026-10-26T04:36:49.804Z",
                      "location": {
                        "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/tasks.ts",
                        "line": 16,
                        "column": 40
                      },
                      "artifacts": [
                        {
                          "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-ana-enters--1000000001--into-campo-7ad4f6ea05.png",
                          "type": "screenshot"
                        }
                      ]
                    },
                    {
                      "name": "Ana clicks on botón ingresar",
                      "outcome": "SUCCESS",
                      "duration": 350,
                      "children": [],
                      "type": "Interaction",
                      "startedAt": "2026-10-26T04:36:49.913Z",
                      "location": {
                        "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/tasks.ts",
                        "line": 17,
                        "column": 13
                      },
                      "artifacts": [
                        {
                          "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-ana-clicks-on-bot-n-ingresar-815a32d793.png",
                          "type": "screenshot"
                        }
                      ]
                    }
                  ],
                  "type": "Task",
                  "startedAt": "2026-10-26T04:36:49.589Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/step-definitions/camila-e2e.steps.ts",
                    "line": 148,
                    "column": 54
                  }
                },
                {
                  "name": "Ana abre el buzón de sugerencias",
                  "outcome": "SUCCESS",
                  "duration": 258,
                  "children": [
                    {
                      "name": "Ana waits until botón Usuarios does become visible",
                      "outcome": "SUCCESS",
                      "duration": 20,
                      "children": [],
                      "type": "Interaction",
                      "startedAt": "2026-10-26T04:36:50.309Z",
                      "location": {
                        "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/tasks.ts",
                        "line": 66,
                        "column": 53
                      },
                      "artifacts": [
                        {
                          "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-ana-waits-until-bot-n-usuarios-doe-a78f4cb309.png",
                          "type": "screenshot"
                        }
                      ]
                    },
                    {
                      "name": "Ana clicks on botón Usuarios",
                      "outcome": "SUCCESS",
                      "duration": 72,
                      "children": [],
                      "type": "Interaction",
                      "startedAt": "2026-10-26T04:36:50.374Z",
                      "location": {
                        "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/tasks.ts",
                        "line": 66,
                        "column": 84
                      },
                      "artifacts": [
                        {
                          "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-ana-clicks-on-bot-n-usuarios-218c857182.png",
                          "type": "screenshot"
                        }
                      ]
                    },
                    {
                      "name": "Ana waits until contador del buzón does become visible",
                      "outcome": "SUCCESS",
                      "duration": 18,
                      "children": [],
                      "type": "Interaction",
                      "startedAt": "2026-10-26T04:36:50.480Z",
                      "location": {
                        "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/tasks.ts",
                        "line": 66,
                        "column": 104
                      },
                      "artifacts": [
                        {
                          "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-ana-waits-until-contador-del-buz-n-71f4ddf9c2.png",
                          "type": "screenshot"
                        }
                      ]
                    }
                  ],
                  "type": "Task",
                  "startedAt": "2026-10-26T04:36:50.309Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/step-definitions/camila-e2e.steps.ts",
                    "line": 148,
                    "column": 90
                  }
                }
              ],
              "type": "Task",
              "startedAt": "2026-10-26T04:36:49.584Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila-e2e.feature",
                "line": 115
              }
            },
            {
              "name": "Entonces debe ver en el buzón el mensaje \"Sugiero agregar un bloque a las 18:00.\"",
              "outcome": "SUCCESS",
              "duration": 73,
              "children": [
                {
                  "name": "Ana ensures that the text of mensajes del buzón does eventually contain at least one item that does include \"Sugiero agregar un bloque a las 18:00.\"",
                  "outcome": "SUCCESS",
                  "duration": 16,
                  "children": [],
                  "type": "Interaction",
                  "startedAt": "2026-10-26T04:36:50.580Z",
                  "location": {
                    "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/step-definitions/camila-e2e.steps.ts",
                    "line": 160,
                    "column": 49
                  },
                  "artifacts": [
                    {
                      "path": "test-runs/2026-10-26T04-36-24.665Z/screenshot-darwin-chromium-153-0-8010-12-ana-ensures-that-the-text-of-mensa-27b5a79719.png",
                      "type": "screenshot"
                    }
                  ]
                }
              ],
              "type": "Task",
              "startedAt": "2026-10-26T04:36:50.578Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila-e2e.feature",
                "line": 116
              }
            },
            {
              "name": "After",
              "outcome": "SUCCESS",
              "duration": 0,
              "children": [],
              "type": "Task",
              "startedAt": "2026-10-26T04:36:50.652Z",
              "location": {
                "path": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila/actors.ts",
                "line": 52
              }
            }
          ]
        }
      ],
      "narrative": "<p>Como entrenador, administradora o estudiante del gimnasio UdeM\nQuiero usar la interfaz web\nPara comprobar los requisitos RF11, RF12, RF13, RF16, RF20 y RF21</p>\n",
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
        },
        {
          "name": "Ana",
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
      "id": "/Users/camilavillero/Downloads/reservas_gimnasio_udem-main/regression_testing/serenityjs/features/camila-e2e.feature:112"
    }
  ],
  "history": [
    {
      "timestamp": "2026-10-26T04:36:24.312Z",
      "duration": 26365,
      "outcomes": {
        "passed": 13,
        "failed": 0,
        "pending": 0,
        "skipped": 0,
        "compromised": 0,
        "error": 0
      },
      "label": "2026-10-26T04-36-24.665Z",
      "slowest": 3383,
      "fastest": 1324,
      "average": 2026,
      "commit": "1d82b39",
      "branch": "main",
      "repositoryUrl": "https://github.com/aleja524/Rutas-campus-grafos.git",
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
      "name": "E2E de navegador - asistencia, cierre de jornada, registro diario y buzón",
      "scenarioCount": 13,
      "passed": 13,
      "failed": 0,
      "skipped": 0
    },
    {
      "type": "tag",
      "name": "camila",
      "scenarioCount": 13,
      "passed": 13,
      "failed": 0,
      "skipped": 0
    },
    {
      "type": "tag",
      "name": "rf11",
      "scenarioCount": 3,
      "passed": 3,
      "failed": 0,
      "skipped": 0
    },
    {
      "type": "tag",
      "name": "rf12",
      "scenarioCount": 3,
      "passed": 3,
      "failed": 0,
      "skipped": 0
    },
    {
      "type": "tag",
      "name": "rf16",
      "scenarioCount": 3,
      "passed": 3,
      "failed": 0,
      "skipped": 0
    },
    {
      "type": "tag",
      "name": "rf13",
      "scenarioCount": 3,
      "passed": 3,
      "failed": 0,
      "skipped": 0
    },
    {
      "type": "tag",
      "name": "rf20",
      "scenarioCount": 3,
      "passed": 3,
      "failed": 0,
      "skipped": 0
    },
    {
      "type": "tag",
      "name": "rf21",
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
    "nodeVersion": "v24.14.0",
    "os": {
      "name": "darwin",
      "version": "25.5.0",
      "arch": "arm64"
    },
    "serenityVersion": "3.48.0",
    "testRunner": {
      "name": "Cucumber",
      "version": "13.3.0"
    },
    "browsers": [],
    "ci": {
      "provider": "localhost (Pro-m5-leaders.local)",
      "buildNumber": "2026-10-26 04:36",
      "branch": "main",
      "commit": "1d82b39",
      "commitMessage": "reto 5",
      "commitAuthor": "ocamilavillero09",
      "repositoryUrl": "https://github.com/aleja524/Rutas-campus-grafos.git"
    },
    "projectName": "serenityjs-e2e-screenplay",
    "packageManager": "npm"
  },
  "capabilities": {
    "type": "directory",
    "name": "features",
    "outcomes": {
      "passed": 13,
      "failed": 0,
      "pending": 0,
      "skipped": 0,
      "compromised": 0,
      "error": 0
    },
    "scenarioCount": 13,
    "children": [
      {
        "type": "file",
        "name": "camila-e2e",
        "outcomes": {
          "passed": 13,
          "failed": 0,
          "pending": 0,
          "skipped": 0,
          "compromised": 0,
          "error": 0
        },
        "scenarioCount": 13,
        "scenarios": [
          {
            "name": "Registrar la asistencia de una estudiante con reserva de hoy (RF11)",
            "outcome": "SUCCESS",
            "executionHistory": [
              "SUCCESS"
            ]
          },
          {
            "name": "Buscar un documento que no está registrado (RF11 error)",
            "outcome": "SUCCESS",
            "executionHistory": [
              "SUCCESS"
            ]
          },
          {
            "name": "Buscar a una estudiante que no tiene reserva activa (RF11 alterno)",
            "outcome": "SUCCESS",
            "executionHistory": [
              "SUCCESS"
            ]
          },
          {
            "name": "Ver a la estudiante pendiente con su documento y sus inasistencias (RF12)",
            "outcome": "SUCCESS",
            "executionHistory": [
              "SUCCESS"
            ]
          },
          {
            "name": "Jornada sin reservas pendientes (RF12 alterno)",
            "outcome": "SUCCESS",
            "executionHistory": [
              "SUCCESS"
            ]
          },
          {
            "name": "Cerrar la jornada confirmando el cierre (RF13)",
            "outcome": "SUCCESS",
            "executionHistory": [
              "SUCCESS"
            ]
          },
          {
            "name": "Arrepentirse de cerrar la jornada (RF13 alterno)",
            "outcome": "SUCCESS",
            "executionHistory": [
              "SUCCESS"
            ]
          },
          {
            "name": "La administradora ve los pendientes pero no cierra la jornada (RF13 error de permisos)",
            "outcome": "SUCCESS",
            "executionHistory": [
              "SUCCESS"
            ]
          },
          {
            "name": "El registro diario ofrece descargar el PDF del día (RF16)",
            "outcome": "SUCCESS",
            "executionHistory": [
              "SUCCESS"
            ]
          },
          {
            "name": "La estudiante envía un reporte al administrador (RF20)",
            "outcome": "SUCCESS",
            "executionHistory": [
              "SUCCESS"
            ]
          },
          {
            "name": "No se puede enviar un mensaje vacío (RF20 alterno)",
            "outcome": "SUCCESS",
            "executionHistory": [
              "SUCCESS"
            ]
          },
          {
            "name": "La administradora lee y borra un mensaje del buzón (RF21)",
            "outcome": "SUCCESS",
            "executionHistory": [
              "SUCCESS"
            ]
          },
          {
            "name": "Recorrido completo del buzón entre estudiante y administradora (RF20 + RF21)",
            "outcome": "SUCCESS",
            "executionHistory": [
              "SUCCESS"
            ]
          }
        ],
        "narrative": "Como entrenador, administradora o estudiante del gimnasio UdeM\nQuiero usar la interfaz web\nPara comprobar los requisitos RF11, RF12, RF13, RF16, RF20 y RF21",
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

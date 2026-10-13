**Carga — 50 usuarios simultáneos durante 2 min**

| Métrica | Antes (runserver) | Después (runserver) |
|---|---|---|
| Peticiones | 4.535 | 4.488 |
| Peticiones por segundo | 26.5 | 26.4 |
| Errores | 0.00 % | 0.00 % |
| Mediana | 42 ms | 13 ms |
| p95 (criterio < 500 ms) | 91 ms | 103 ms |
| p99 | 137 ms | 142 ms |
| Máximo | 285 ms | 249 ms |

| Operación (p95) | Antes (runserver) | Después (runserver) |
|---|---|---|
| Iniciar sesión | 119 ms ✅ | 144 ms ✅ |
| Consultar horarios | 34 ms ✅ | 18 ms ✅ |
| Mis reservas | 49 ms ✅ | 49 ms ✅ |
| Historial | 7 ms ✅ | 8 ms ✅ |
| RF11 · Buscar estudiante | 13 ms ✅ | 12 ms ✅ |
| RF11 · Registrar asistencia | 56 ms ✅ | 52 ms ✅ |
| RF12 · Pendientes | 87 ms ✅ | 21 ms ✅ |
| RF16 · Registro diario | 176 ms ✅ | 25 ms ✅ |
| RF20 · Enviar sugerencia | 50 ms ✅ | 51 ms ✅ |
| RF21 · Buzón | 18 ms ✅ | 18 ms ✅ |

**Estrés — escalones de 50, 100 y 200 usuarios**

| Métrica | Antes (runserver) | Después (runserver) | Después + gunicorn |
|---|---|---|---|
| Peticiones | 13.713 | 13.613 | 14.780 |
| Peticiones por segundo | 55.6 | 55.4 | 60.0 |
| Errores | 0.00 % | 0.00 % | 0.00 % |
| Mediana | 61 ms | 45 ms | 19 ms |
| p95 (criterio < 500 ms) | 1.25 s | 1.81 s | 698 ms |
| p99 | 3.13 s | 3.43 s | 1.37 s |
| Máximo | 8.13 s | 5.96 s | 2.49 s |

| Operación (p95) | Antes (runserver) | Después (runserver) | Después + gunicorn |
|---|---|---|---|
| Iniciar sesión | 1.81 s ❌ | 2.92 s ❌ | 1.10 s ❌ |
| Consultar horarios | 1.36 s ❌ | 1.80 s ❌ | 667 ms ❌ |
| Mis reservas | 568 ms ❌ | 157 ms ✅ | 543 ms ❌ |
| Historial | 226 ms ✅ | 178 ms ✅ | 468 ms ✅ |
| RF11 · Buscar estudiante | 708 ms ❌ | 1.99 s ❌ | 558 ms ❌ |
| RF11 · Registrar asistencia | 849 ms ❌ | 1.45 s ❌ | 466 ms ✅ |
| RF12 · Pendientes | 786 ms ❌ | 2.38 s ❌ | 510 ms ❌ |
| RF16 · Registro diario | 7.03 s ❌ | 1.55 s ❌ | 445 ms ✅ |
| RF20 · Enviar sugerencia | 449 ms ✅ | 543 ms ❌ | 463 ms ✅ |
| RF21 · Buzón | 813 ms ❌ | 2.14 s ❌ | 685 ms ❌ |

**Estrés por escalón** (p95 · mediana · peticiones por segundo · errores)

| Usuarios | Antes (runserver) | Después (runserver) | Después + gunicorn |
|---|---|---|---|
| 50 | 87 ms ✅ · 42 ms · 31/s · 0.0 % | 98 ms ✅ · 15 ms · 31/s · 0.0 % | 101 ms ✅ · 8 ms · 32/s · 0.0 % |
| 100 | 165 ms ✅ · 43 ms · 61/s · 0.0 % | 142 ms ✅ · 22 ms · 61/s · 0.0 % | 145 ms ✅ · 10 ms · 62/s · 0.0 % |
| 200 | 2.16 s ❌ · 246 ms · 89/s · 0.0 % | 2.99 s ❌ · 101 ms · 86/s · 0.0 % | 1.14 s ❌ · 162 ms · 106/s · 0.0 % |
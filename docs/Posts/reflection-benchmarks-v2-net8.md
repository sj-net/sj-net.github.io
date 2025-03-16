BenchmarkDotNet v0.14.0, Windows 11 (10.0.26100.3476)
Unknown processor
.NET SDK 9.0.201
  [Host]   : .NET 8.0.13 (8.0.1325.6609), X64 RyuJIT AVX2
  .NET 8.0 : .NET 8.0.13 (8.0.1325.6609), X64 RyuJIT AVX2

Job=.NET 8.0  Runtime=.NET 8.0  

| Method                     | Categories   | Mean       | Error     | StdDev    | Median     | Ratio | MannWhitney(10%) | RatioSD | Baseline | Gen0   | Allocated | Alloc Ratio |
|--------------------------- |------------- |-----------:|----------:|----------:|-----------:|------:|----------------- |--------:|--------- |-------:|----------:|------------:|
| No_Reflection_Get_DateTime | get_DateTime |  3.1952 ns | 0.1054 ns | 0.2832 ns |  3.1038 ns |  0.18 | Faster           |    0.02 | No       | 0.0019 |      24 B |        1.00 |
| Reflection_Get_DateTime    | get_DateTime | 18.0089 ns | 0.3991 ns | 1.1515 ns | 18.1901 ns |  1.00 | Baseline         |    0.09 | Yes      | 0.0019 |      24 B |        1.00 |
|                            |              |            |           |           |            |       |                  |         |          |        |           |             |
| No_Reflection_Get_Decimal  | get_Decimal  |  3.0502 ns | 0.0695 ns | 0.0542 ns |  3.0548 ns |  0.17 | Faster           |    0.01 | No       | 0.0025 |      32 B |        1.00 |
| Reflection_Get_Decimal     | get_Decimal  | 17.7494 ns | 0.4485 ns | 1.3154 ns | 18.0059 ns |  1.01 | Baseline         |    0.10 | Yes      | 0.0025 |      32 B |        1.00 |
|                            |              |            |           |           |            |       |                  |         |          |        |           |             |
| No_Reflection_Get_Double   | get_Double   |  3.1259 ns | 0.1086 ns | 0.2337 ns |  3.1649 ns |  0.18 | Faster           |    0.02 | No       | 0.0019 |      24 B |        1.00 |
| Reflection_Get_Double      | get_Double   | 17.1427 ns | 0.4029 ns | 1.1752 ns | 17.5331 ns |  1.00 | Baseline         |    0.10 | Yes      | 0.0019 |      24 B |        1.00 |
|                            |              |            |           |           |            |       |                  |         |          |        |           |             |
| No_Reflection_Get_Guid     | get_Guid     |  3.3568 ns | 0.1097 ns | 0.2499 ns |  3.2612 ns |  0.20 | Faster           |    0.02 | No       | 0.0025 |      32 B |        1.00 |
| Reflection_Get_Guid        | get_Guid     | 16.9630 ns | 0.3908 ns | 1.1524 ns | 16.4968 ns |  1.00 | Baseline         |    0.09 | Yes      | 0.0025 |      32 B |        1.00 |
|                            |              |            |           |           |            |       |                  |         |          |        |           |             |
| No_Reflection_Get_Integer  | get_Integer  |  3.1797 ns | 0.1109 ns | 0.2502 ns |  3.2589 ns |  0.19 | Faster           |    0.02 | No       | 0.0019 |      24 B |        1.00 |
| Reflection_Get_Integer     | get_Integer  | 17.0370 ns | 0.4125 ns | 1.1968 ns | 17.2402 ns |  1.00 | Baseline         |    0.10 | Yes      | 0.0019 |      24 B |        1.00 |
|                            |              |            |           |           |            |       |                  |         |          |        |           |             |
| No_Reflection_Get_String   | get_String   |  0.0102 ns | 0.0295 ns | 0.0246 ns |  0.0000 ns | 0.001 | Faster           |    0.00 | No       |      - |         - |          NA |
| Reflection_Get_String      | get_String   | 14.7815 ns | 0.3365 ns | 0.9655 ns | 15.1845 ns | 1.004 | Baseline         |    0.09 | Yes      |      - |         - |          NA |
|                            |              |            |           |           |            |       |                  |         |          |        |           |             |
| No_Reflection_Set_DateTime | set_DateTime | 26.1057 ns | 0.5451 ns | 0.6694 ns | 25.6896 ns |  0.59 | Faster           |    0.03 | No       | 0.0019 |      24 B |        1.00 |
| Reflection_Set_DateTime    | set_DateTime | 44.4062 ns | 0.9136 ns | 1.7383 ns | 45.0498 ns |  1.00 | Baseline         |    0.06 | Yes      | 0.0019 |      24 B |        1.00 |
|                            |              |            |           |           |            |       |                  |         |          |        |           |             |
| No_Reflection_Set_Decimal  | set_Decimal  |  5.4357 ns | 0.1310 ns | 0.2361 ns |  5.4069 ns |  0.31 | Faster           |    0.02 | No       | 0.0025 |      32 B |        1.00 |
| Reflection_Set_Decimal     | set_Decimal  | 17.5950 ns | 0.3823 ns | 1.1213 ns | 16.9816 ns |  1.00 | Baseline         |    0.09 | Yes      | 0.0025 |      32 B |        1.00 |
|                            |              |            |           |           |            |       |                  |         |          |        |           |             |
| No_Reflection_Set_Double   | set_Double   |  2.3197 ns | 0.0747 ns | 0.2202 ns |  2.3434 ns |  0.14 | Faster           |    0.02 | No       | 0.0019 |      24 B |        1.00 |
| Reflection_Set_Double      | set_Double   | 16.7817 ns | 0.3587 ns | 1.0519 ns | 16.2912 ns |  1.00 | Baseline         |    0.09 | Yes      | 0.0019 |      24 B |        1.00 |
|                            |              |            |           |           |            |       |                  |         |          |        |           |             |
| No_Reflection_Set_Guid     | set_Guid     | 45.9252 ns | 0.9316 ns | 1.8389 ns | 46.0245 ns |  0.79 | Faster           |    0.05 | No       | 0.0025 |      32 B |        1.00 |
| Reflection_Set_Guid        | set_Guid     | 58.0253 ns | 1.1902 ns | 3.2380 ns | 56.8066 ns |  1.00 | Baseline         |    0.08 | Yes      | 0.0025 |      32 B |        1.00 |
|                            |              |            |           |           |            |       |                  |         |          |        |           |             |
| No_Reflection_Set_Integer  | set_Integer  |  2.2119 ns | 0.0702 ns | 0.1570 ns |  2.2017 ns |  0.13 | Faster           |    0.01 | No       | 0.0019 |      24 B |        1.00 |
| Reflection_Set_Integer     | set_Integer  | 16.8728 ns | 0.3830 ns | 1.1232 ns | 16.8994 ns |  1.00 | Baseline         |    0.09 | Yes      | 0.0019 |      24 B |        1.00 |
|                            |              |            |           |           |            |       |                  |         |          |        |           |             |
| No_Reflection_Set_String   | set_String   |  0.1334 ns | 0.0055 ns | 0.0049 ns |  0.1323 ns | 0.008 | Faster           |    0.00 | No       |      - |         - |          NA |
| Reflection_Set_String      | set_String   | 16.2128 ns | 0.1636 ns | 0.1366 ns | 16.2276 ns | 1.000 | Baseline         |    0.01 | Yes      |      - |         - |          NA |

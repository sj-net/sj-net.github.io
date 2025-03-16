```
BenchmarkDotNet v0.14.0, Windows 11 (10.0.26100.3476)
Unknown processor
.NET SDK 9.0.201
  [Host]   : .NET 8.0.13 (8.0.1325.6609), X64 RyuJIT AVX2
  .NET 6.0 : .NET 6.0.36 (6.0.3624.51421), X64 RyuJIT AVX2
  .NET 7.0 : .NET 7.0.20 (7.0.2024.26716), X64 RyuJIT AVX2
  .NET 8.0 : .NET 8.0.13 (8.0.1325.6609), X64 RyuJIT AVX2
  .NET 9.0 : .NET 9.0.3 (9.0.325.11113), X64 RyuJIT AVX2
```


| Method                     | Job      | Runtime  | Categories   | Mean       | Error     | StdDev    | Median     | Ratio | MannWhitney(10%) | RatioSD | Baseline | Gen0   | Gen1   | Allocated | Alloc Ratio |
|--------------------------- |--------- |--------- |------------- |-----------:|----------:|----------:|-----------:|------:|----------------- |--------:|--------- |-------:|-------:|----------:|------------:|
| No_Reflection_Get_DateTime | .NET 6.0 | .NET 6.0 | get_DateTime |  3.4865 ns | 0.2031 ns | 0.5988 ns |  3.5003 ns |  0.10 | Faster           |    0.02 | No       | 0.0019 |      - |      24 B |        1.00 |
| Reflection_Get_DateTime    | .NET 6.0 | .NET 6.0 | get_DateTime | 33.4404 ns | 0.6963 ns | 1.1044 ns | 33.4447 ns |  1.00 | Baseline         |    0.05 | Yes      | 0.0019 |      - |      24 B |        1.00 |
|                            |          |          |              |            |           |           |            |       |                  |         |          |        |        |           |             |
| No_Reflection_Get_DateTime | .NET 7.0 | .NET 7.0 | get_DateTime |  5.4171 ns | 0.2106 ns | 0.6075 ns |  5.3596 ns |  0.14 | Faster           |    0.02 | No       | 0.0019 |      - |      24 B |        1.00 |
| Reflection_Get_DateTime    | .NET 7.0 | .NET 7.0 | get_DateTime | 38.9067 ns | 0.8112 ns | 1.8143 ns | 38.7114 ns |  1.00 | Baseline         |    0.07 | Yes      | 0.0019 |      - |      24 B |        1.00 |
|                            |          |          |              |            |           |           |            |       |                  |         |          |        |        |           |             |
| No_Reflection_Get_DateTime | .NET 8.0 | .NET 8.0 | get_DateTime |  3.5180 ns | 0.2014 ns | 0.5938 ns |  3.6613 ns |  0.20 | Faster           |    0.03 | No       | 0.0019 |      - |      24 B |        1.00 |
| Reflection_Get_DateTime    | .NET 8.0 | .NET 8.0 | get_DateTime | 17.2916 ns | 0.3853 ns | 0.3604 ns | 17.2437 ns |  1.00 | Baseline         |    0.03 | Yes      | 0.0019 |      - |      24 B |        1.00 |
|                            |          |          |              |            |           |           |            |       |                  |         |          |        |        |           |             |
| No_Reflection_Get_DateTime | .NET 9.0 | .NET 9.0 | get_DateTime |  3.0909 ns | 0.1035 ns | 0.2520 ns |  3.1352 ns |  0.17 | Faster           |    0.01 | No       | 0.0019 |      - |      24 B |        1.00 |
| Reflection_Get_DateTime    | .NET 9.0 | .NET 9.0 | get_DateTime | 17.8825 ns | 0.3652 ns | 0.3416 ns | 17.6864 ns |  1.00 | Baseline         |    0.03 | Yes      | 0.0019 |      - |      24 B |        1.00 |
|                            |          |          |              |            |           |           |            |       |                  |         |          |        |        |           |             |
| No_Reflection_Get_Decimal  | .NET 6.0 | .NET 6.0 | get_Decimal  |  5.3510 ns | 0.1457 ns | 0.2353 ns |  5.2573 ns |  0.18 | Faster           |    0.01 | No       | 0.0025 |      - |      32 B |        1.00 |
| Reflection_Get_Decimal     | .NET 6.0 | .NET 6.0 | get_Decimal  | 29.4175 ns | 0.3710 ns | 0.3288 ns | 29.2637 ns |  1.00 | Baseline         |    0.02 | Yes      | 0.0025 |      - |      32 B |        1.00 |
|                            |          |          |              |            |           |           |            |       |                  |         |          |        |        |           |             |
| No_Reflection_Get_Decimal  | .NET 7.0 | .NET 7.0 | get_Decimal  |  5.1898 ns | 0.0547 ns | 0.0512 ns |  5.1933 ns |  0.15 | Faster           |    0.00 | No       | 0.0025 |      - |      32 B |        1.00 |
| Reflection_Get_Decimal     | .NET 7.0 | .NET 7.0 | get_Decimal  | 34.0332 ns | 0.3561 ns | 0.3331 ns | 34.0340 ns |  1.00 | Baseline         |    0.01 | Yes      | 0.0025 |      - |      32 B |        1.00 |
|                            |          |          |              |            |           |           |            |       |                  |         |          |        |        |           |             |
| No_Reflection_Get_Decimal  | .NET 8.0 | .NET 8.0 | get_Decimal  |  3.0803 ns | 0.0471 ns | 0.0441 ns |  3.0811 ns |  0.19 | Faster           |    0.00 | No       | 0.0025 |      - |      32 B |        1.00 |
| Reflection_Get_Decimal     | .NET 8.0 | .NET 8.0 | get_Decimal  | 16.5242 ns | 0.2369 ns | 0.2100 ns | 16.4655 ns |  1.00 | Baseline         |    0.02 | Yes      | 0.0025 |      - |      32 B |        1.00 |
|                            |          |          |              |            |           |           |            |       |                  |         |          |        |        |           |             |
| No_Reflection_Get_Decimal  | .NET 9.0 | .NET 9.0 | get_Decimal  |  3.0898 ns | 0.0462 ns | 0.0386 ns |  3.0988 ns |  0.19 | Faster           |    0.00 | No       | 0.0025 |      - |      32 B |        1.00 |
| Reflection_Get_Decimal     | .NET 9.0 | .NET 9.0 | get_Decimal  | 15.9320 ns | 0.2568 ns | 0.2402 ns | 15.8470 ns |  1.00 | Baseline         |    0.02 | Yes      | 0.0025 |      - |      32 B |        1.00 |
|                            |          |          |              |            |           |           |            |       |                  |         |          |        |        |           |             |
| No_Reflection_Get_Double   | .NET 6.0 | .NET 6.0 | get_Double   |  5.1079 ns | 0.0692 ns | 0.0647 ns |  5.1184 ns |  0.17 | Faster           |    0.00 | No       | 0.0019 |      - |      24 B |        1.00 |
| Reflection_Get_Double      | .NET 6.0 | .NET 6.0 | get_Double   | 29.4315 ns | 0.3071 ns | 0.2873 ns | 29.3165 ns |  1.00 | Baseline         |    0.01 | Yes      | 0.0019 |      - |      24 B |        1.00 |
|                            |          |          |              |            |           |           |            |       |                  |         |          |        |        |           |             |
| No_Reflection_Get_Double   | .NET 7.0 | .NET 7.0 | get_Double   |  4.9540 ns | 0.1143 ns | 0.1013 ns |  4.9427 ns |  0.15 | Faster           |    0.00 | No       | 0.0019 |      - |      24 B |        1.00 |
| Reflection_Get_Double      | .NET 7.0 | .NET 7.0 | get_Double   | 33.6847 ns | 0.3743 ns | 0.3126 ns | 33.7263 ns |  1.00 | Baseline         |    0.01 | Yes      | 0.0019 | 0.0001 |      24 B |        1.00 |
|                            |          |          |              |            |           |           |            |       |                  |         |          |        |        |           |             |
| No_Reflection_Get_Double   | .NET 8.0 | .NET 8.0 | get_Double   |  3.0837 ns | 0.1054 ns | 0.2154 ns |  3.0406 ns |  0.20 | Faster           |    0.01 | No       | 0.0019 |      - |      24 B |        1.00 |
| Reflection_Get_Double      | .NET 8.0 | .NET 8.0 | get_Double   | 15.5665 ns | 0.1582 ns | 0.1758 ns | 15.5677 ns |  1.00 | Baseline         |    0.02 | Yes      | 0.0019 |      - |      24 B |        1.00 |
|                            |          |          |              |            |           |           |            |       |                  |         |          |        |        |           |             |
| No_Reflection_Get_Double   | .NET 9.0 | .NET 9.0 | get_Double   |  3.3394 ns | 0.1085 ns | 0.1333 ns |  3.3635 ns |  0.20 | Faster           |    0.01 | No       | 0.0019 |      - |      24 B |        1.00 |
| Reflection_Get_Double      | .NET 9.0 | .NET 9.0 | get_Double   | 16.6669 ns | 0.2222 ns | 0.2078 ns | 16.5953 ns |  1.00 | Baseline         |    0.02 | Yes      | 0.0019 |      - |      24 B |        1.00 |
|                            |          |          |              |            |           |           |            |       |                  |         |          |        |        |           |             |
| No_Reflection_Get_Guid     | .NET 6.0 | .NET 6.0 | get_Guid     |  3.6792 ns | 0.1084 ns | 0.1014 ns |  3.6552 ns |  0.12 | Faster           |    0.00 | No       | 0.0025 |      - |      32 B |        1.00 |
| Reflection_Get_Guid        | .NET 6.0 | .NET 6.0 | get_Guid     | 31.2521 ns | 0.6247 ns | 0.5844 ns | 31.0466 ns |  1.00 | Baseline         |    0.03 | Yes      | 0.0025 |      - |      32 B |        1.00 |
|                            |          |          |              |            |           |           |            |       |                  |         |          |        |        |           |             |
| No_Reflection_Get_Guid     | .NET 7.0 | .NET 7.0 | get_Guid     |  4.5020 ns | 0.0630 ns | 0.0589 ns |  4.4905 ns |  0.12 | Faster           |    0.00 | No       | 0.0025 |      - |      32 B |        1.00 |
| Reflection_Get_Guid        | .NET 7.0 | .NET 7.0 | get_Guid     | 36.1687 ns | 0.7656 ns | 1.1460 ns | 36.4218 ns |  1.00 | Baseline         |    0.05 | Yes      | 0.0025 |      - |      32 B |        1.00 |
|                            |          |          |              |            |           |           |            |       |                  |         |          |        |        |           |             |
| No_Reflection_Get_Guid     | .NET 8.0 | .NET 8.0 | get_Guid     |  2.9928 ns | 0.1032 ns | 0.1013 ns |  3.0201 ns |  0.18 | Faster           |    0.01 | No       | 0.0025 |      - |      32 B |        1.00 |
| Reflection_Get_Guid        | .NET 8.0 | .NET 8.0 | get_Guid     | 16.9250 ns | 0.3787 ns | 0.8471 ns | 17.2805 ns |  1.00 | Baseline         |    0.07 | Yes      | 0.0025 |      - |      32 B |        1.00 |
|                            |          |          |              |            |           |           |            |       |                  |         |          |        |        |           |             |
| No_Reflection_Get_Guid     | .NET 9.0 | .NET 9.0 | get_Guid     |  3.4239 ns | 0.1098 ns | 0.1175 ns |  3.4484 ns |  0.20 | Faster           |    0.01 | No       | 0.0025 |      - |      32 B |        1.00 |
| Reflection_Get_Guid        | .NET 9.0 | .NET 9.0 | get_Guid     | 17.1184 ns | 0.2982 ns | 0.2789 ns | 17.1164 ns |  1.00 | Baseline         |    0.02 | Yes      | 0.0025 |      - |      32 B |        1.00 |
|                            |          |          |              |            |           |           |            |       |                  |         |          |        |        |           |             |
| No_Reflection_Get_Integer  | .NET 6.0 | .NET 6.0 | get_Integer  |  3.3910 ns | 0.1073 ns | 0.1148 ns |  3.3855 ns |  0.11 | Faster           |    0.01 | No       | 0.0019 |      - |      24 B |        1.00 |
| Reflection_Get_Integer     | .NET 6.0 | .NET 6.0 | get_Integer  | 30.2525 ns | 0.6411 ns | 1.4600 ns | 30.6459 ns |  1.00 | Baseline         |    0.07 | Yes      | 0.0019 |      - |      24 B |        1.00 |
|                            |          |          |              |            |           |           |            |       |                  |         |          |        |        |           |             |
| No_Reflection_Get_Integer  | .NET 7.0 | .NET 7.0 | get_Integer  |  4.7540 ns | 0.1359 ns | 0.1455 ns |  4.7831 ns |  0.15 | Faster           |    0.00 | No       | 0.0019 |      - |      24 B |        1.00 |
| Reflection_Get_Integer     | .NET 7.0 | .NET 7.0 | get_Integer  | 32.5489 ns | 0.3169 ns | 0.2964 ns | 32.4358 ns |  1.00 | Baseline         |    0.01 | Yes      | 0.0019 |      - |      24 B |        1.00 |
|                            |          |          |              |            |           |           |            |       |                  |         |          |        |        |           |             |
| No_Reflection_Get_Integer  | .NET 8.0 | .NET 8.0 | get_Integer  |  2.9393 ns | 0.0455 ns | 0.0425 ns |  2.9514 ns |  0.19 | Faster           |    0.00 | No       | 0.0019 |      - |      24 B |        1.00 |
| Reflection_Get_Integer     | .NET 8.0 | .NET 8.0 | get_Integer  | 15.6590 ns | 0.2173 ns | 0.2033 ns | 15.6707 ns |  1.00 | Baseline         |    0.02 | Yes      | 0.0019 |      - |      24 B |        1.00 |
|                            |          |          |              |            |           |           |            |       |                  |         |          |        |        |           |             |
| No_Reflection_Get_Integer  | .NET 9.0 | .NET 9.0 | get_Integer  |  3.1518 ns | 0.1024 ns | 0.1794 ns |  3.1774 ns |  0.19 | Faster           |    0.01 | No       | 0.0019 |      - |      24 B |        1.00 |
| Reflection_Get_Integer     | .NET 9.0 | .NET 9.0 | get_Integer  | 16.4171 ns | 0.2658 ns | 0.2486 ns | 16.2908 ns |  1.00 | Baseline         |    0.02 | Yes      | 0.0019 |      - |      24 B |        1.00 |
|                            |          |          |              |            |           |           |            |       |                  |         |          |        |        |           |             |
| No_Reflection_Get_String   | .NET 6.0 | .NET 6.0 | get_String   |  1.8470 ns | 0.0688 ns | 0.0644 ns |  1.8525 ns |  0.06 | Faster           |    0.00 | No       |      - |      - |         - |          NA |
| Reflection_Get_String      | .NET 6.0 | .NET 6.0 | get_String   | 29.2731 ns | 0.6007 ns | 0.7597 ns | 29.2987 ns |  1.00 | Baseline         |    0.04 | Yes      |      - |      - |         - |          NA |
|                            |          |          |              |            |           |           |            |       |                  |         |          |        |        |           |             |
| No_Reflection_Get_String   | .NET 7.0 | .NET 7.0 | get_String   |  1.8012 ns | 0.0505 ns | 0.0473 ns |  1.8093 ns |  0.05 | Faster           |    0.00 | No       |      - |      - |         - |          NA |
| Reflection_Get_String      | .NET 7.0 | .NET 7.0 | get_String   | 33.0857 ns | 0.5334 ns | 0.4989 ns | 32.9922 ns |  1.00 | Baseline         |    0.02 | Yes      |      - |      - |         - |          NA |
|                            |          |          |              |            |           |           |            |       |                  |         |          |        |        |           |             |
| No_Reflection_Get_String   | .NET 8.0 | .NET 8.0 | get_String   |  0.0040 ns | 0.0073 ns | 0.0068 ns |  0.0000 ns | 0.000 | Faster           |    0.00 | No       |      - |      - |         - |          NA |
| Reflection_Get_String      | .NET 8.0 | .NET 8.0 | get_String   | 14.6744 ns | 0.3297 ns | 0.5325 ns | 14.7295 ns | 1.001 | Baseline         |    0.05 | Yes      |      - |      - |         - |          NA |
|                            |          |          |              |            |           |           |            |       |                  |         |          |        |        |           |             |
| No_Reflection_Get_String   | .NET 9.0 | .NET 9.0 | get_String   |  0.0088 ns | 0.0093 ns | 0.0124 ns |  0.0000 ns | 0.001 | Faster           |    0.00 | No       |      - |      - |         - |          NA |
| Reflection_Get_String      | .NET 9.0 | .NET 9.0 | get_String   | 11.9984 ns | 0.2328 ns | 0.2944 ns | 11.9009 ns | 1.001 | Baseline         |    0.03 | Yes      |      - |      - |         - |          NA |
|                            |          |          |              |            |           |           |            |       |                  |         |          |        |        |           |             |
| No_Reflection_Set_DateTime | .NET 6.0 | .NET 6.0 | set_DateTime | 29.1623 ns | 0.2576 ns | 0.2409 ns | 29.1822 ns |  0.55 | Faster           |    0.01 | No       | 0.0019 |      - |      24 B |        1.00 |
| Reflection_Set_DateTime    | .NET 6.0 | .NET 6.0 | set_DateTime | 53.0276 ns | 0.5083 ns | 0.4506 ns | 53.0638 ns |  1.00 | Baseline         |    0.01 | Yes      | 0.0019 |      - |      24 B |        1.00 |
|                            |          |          |              |            |           |           |            |       |                  |         |          |        |        |           |             |
| No_Reflection_Set_DateTime | .NET 7.0 | .NET 7.0 | set_DateTime | 26.4928 ns | 0.3970 ns | 0.3899 ns | 26.4162 ns |  0.51 | Faster           |    0.02 | No       | 0.0019 |      - |      24 B |        1.00 |
| Reflection_Set_DateTime    | .NET 7.0 | .NET 7.0 | set_DateTime | 52.0872 ns | 1.0601 ns | 2.2820 ns | 51.5668 ns |  1.00 | Baseline         |    0.06 | Yes      | 0.0019 |      - |      24 B |        1.00 |
|                            |          |          |              |            |           |           |            |       |                  |         |          |        |        |           |             |
| No_Reflection_Set_DateTime | .NET 8.0 | .NET 8.0 | set_DateTime | 25.6344 ns | 0.3191 ns | 0.2829 ns | 25.6561 ns |  0.61 | Faster           |    0.01 | No       | 0.0019 |      - |      24 B |        1.00 |
| Reflection_Set_DateTime    | .NET 8.0 | .NET 8.0 | set_DateTime | 42.0850 ns | 0.1805 ns | 0.1600 ns | 42.0981 ns |  1.00 | Baseline         |    0.01 | Yes      | 0.0019 |      - |      24 B |        1.00 |
|                            |          |          |              |            |           |           |            |       |                  |         |          |        |        |           |             |
| No_Reflection_Set_DateTime | .NET 9.0 | .NET 9.0 | set_DateTime | 25.6158 ns | 0.2075 ns | 0.1941 ns | 25.5616 ns |  0.64 | Faster           |    0.01 | No       | 0.0019 |      - |      24 B |        1.00 |
| Reflection_Set_DateTime    | .NET 9.0 | .NET 9.0 | set_DateTime | 40.1052 ns | 0.2504 ns | 0.2343 ns | 40.0762 ns |  1.00 | Baseline         |    0.01 | Yes      | 0.0019 |      - |      24 B |        1.00 |
|                            |          |          |              |            |           |           |            |       |                  |         |          |        |        |           |             |
| No_Reflection_Set_Decimal  | .NET 6.0 | .NET 6.0 | set_Decimal  |  5.0919 ns | 0.0914 ns | 0.0855 ns |  5.0752 ns |  0.18 | Faster           |    0.00 | No       | 0.0025 |      - |      32 B |        1.00 |
| Reflection_Set_Decimal     | .NET 6.0 | .NET 6.0 | set_Decimal  | 28.7903 ns | 0.2257 ns | 0.1762 ns | 28.7401 ns |  1.00 | Baseline         |    0.01 | Yes      | 0.0025 |      - |      32 B |        1.00 |
|                            |          |          |              |            |           |           |            |       |                  |         |          |        |        |           |             |
| No_Reflection_Set_Decimal  | .NET 7.0 | .NET 7.0 | set_Decimal  |  3.7979 ns | 0.0962 ns | 0.1497 ns |  3.7418 ns |  0.12 | Faster           |    0.00 | No       | 0.0025 |      - |      32 B |        1.00 |
| Reflection_Set_Decimal     | .NET 7.0 | .NET 7.0 | set_Decimal  | 31.9549 ns | 0.4833 ns | 0.4284 ns | 31.8550 ns |  1.00 | Baseline         |    0.02 | Yes      | 0.0025 |      - |      32 B |        1.00 |
|                            |          |          |              |            |           |           |            |       |                  |         |          |        |        |           |             |
| No_Reflection_Set_Decimal  | .NET 8.0 | .NET 8.0 | set_Decimal  |  5.2556 ns | 0.0702 ns | 0.0657 ns |  5.2573 ns |  0.32 | Faster           |    0.01 | No       | 0.0025 |      - |      32 B |        1.00 |
| Reflection_Set_Decimal     | .NET 8.0 | .NET 8.0 | set_Decimal  | 16.5809 ns | 0.2724 ns | 0.2126 ns | 16.5817 ns |  1.00 | Baseline         |    0.02 | Yes      | 0.0025 |      - |      32 B |        1.00 |
|                            |          |          |              |            |           |           |            |       |                  |         |          |        |        |           |             |
| No_Reflection_Set_Decimal  | .NET 9.0 | .NET 9.0 | set_Decimal  |  4.9826 ns | 0.1240 ns | 0.2329 ns |  4.9466 ns |  0.34 | Faster           |    0.02 | No       | 0.0025 |      - |      32 B |        1.00 |
| Reflection_Set_Decimal     | .NET 9.0 | .NET 9.0 | set_Decimal  | 14.7055 ns | 0.1651 ns | 0.1464 ns | 14.7088 ns |  1.00 | Baseline         |    0.01 | Yes      | 0.0025 |      - |      32 B |        1.00 |
|                            |          |          |              |            |           |           |            |       |                  |         |          |        |        |           |             |
| No_Reflection_Set_Double   | .NET 6.0 | .NET 6.0 | set_Double   |  5.6675 ns | 0.1335 ns | 0.2267 ns |  5.6114 ns |  0.19 | Faster           |    0.01 | No       | 0.0019 |      - |      24 B |        1.00 |
| Reflection_Set_Double      | .NET 6.0 | .NET 6.0 | set_Double   | 29.1123 ns | 0.2563 ns | 0.2272 ns | 29.0234 ns |  1.00 | Baseline         |    0.01 | Yes      | 0.0019 |      - |      24 B |        1.00 |
|                            |          |          |              |            |           |           |            |       |                  |         |          |        |        |           |             |
| No_Reflection_Set_Double   | .NET 7.0 | .NET 7.0 | set_Double   |  3.1730 ns | 0.0870 ns | 0.1162 ns |  3.1232 ns |  0.10 | Faster           |    0.00 | No       | 0.0019 |      - |      24 B |        1.00 |
| Reflection_Set_Double      | .NET 7.0 | .NET 7.0 | set_Double   | 31.6306 ns | 0.5048 ns | 0.4215 ns | 31.5279 ns |  1.00 | Baseline         |    0.02 | Yes      | 0.0019 |      - |      24 B |        1.00 |
|                            |          |          |              |            |           |           |            |       |                  |         |          |        |        |           |             |
| No_Reflection_Set_Double   | .NET 8.0 | .NET 8.0 | set_Double   |  2.2424 ns | 0.0356 ns | 0.0333 ns |  2.2377 ns |  0.14 | Faster           |    0.00 | No       | 0.0019 |      - |      24 B |        1.00 |
| Reflection_Set_Double      | .NET 8.0 | .NET 8.0 | set_Double   | 15.8232 ns | 0.1597 ns | 0.1416 ns | 15.7883 ns |  1.00 | Baseline         |    0.01 | Yes      | 0.0019 |      - |      24 B |        1.00 |
|                            |          |          |              |            |           |           |            |       |                  |         |          |        |        |           |             |
| No_Reflection_Set_Double   | .NET 9.0 | .NET 9.0 | set_Double   |  2.2240 ns | 0.0671 ns | 0.0628 ns |  2.2001 ns |  0.15 | Faster           |    0.01 | No       | 0.0019 |      - |      24 B |        1.00 |
| Reflection_Set_Double      | .NET 9.0 | .NET 9.0 | set_Double   | 15.3572 ns | 0.3291 ns | 0.8257 ns | 15.6023 ns |  1.00 | Baseline         |    0.08 | Yes      | 0.0019 |      - |      24 B |        1.00 |
|                            |          |          |              |            |           |           |            |       |                  |         |          |        |        |           |             |
| No_Reflection_Set_Guid     | .NET 6.0 | .NET 6.0 | set_Guid     | 48.7274 ns | 0.7681 ns | 0.7185 ns | 48.6953 ns |  0.68 | Faster           |    0.01 | No       | 0.0025 |      - |      32 B |        1.00 |
| Reflection_Set_Guid        | .NET 6.0 | .NET 6.0 | set_Guid     | 71.7214 ns | 1.1170 ns | 1.0448 ns | 71.5853 ns |  1.00 | Baseline         |    0.02 | Yes      | 0.0025 |      - |      32 B |        1.00 |
|                            |          |          |              |            |           |           |            |       |                  |         |          |        |        |           |             |
| No_Reflection_Set_Guid     | .NET 7.0 | .NET 7.0 | set_Guid     | 49.2971 ns | 1.0019 ns | 0.9840 ns | 49.3340 ns |  0.70 | Faster           |    0.02 | No       | 0.0025 |      - |      32 B |        1.00 |
| Reflection_Set_Guid        | .NET 7.0 | .NET 7.0 | set_Guid     | 70.9173 ns | 0.7944 ns | 0.7042 ns | 70.7918 ns |  1.00 | Baseline         |    0.01 | Yes      | 0.0025 |      - |      32 B |        1.00 |
|                            |          |          |              |            |           |           |            |       |                  |         |          |        |        |           |             |
| No_Reflection_Set_Guid     | .NET 8.0 | .NET 8.0 | set_Guid     | 46.5364 ns | 0.4496 ns | 0.3985 ns | 46.4680 ns |  0.77 | Faster           |    0.01 | No       | 0.0025 |      - |      32 B |        1.00 |
| Reflection_Set_Guid        | .NET 8.0 | .NET 8.0 | set_Guid     | 60.4378 ns | 0.4444 ns | 0.4157 ns | 60.5222 ns |  1.00 | Baseline         |    0.01 | Yes      | 0.0025 |      - |      32 B |        1.00 |
|                            |          |          |              |            |           |           |            |       |                  |         |          |        |        |           |             |
| No_Reflection_Set_Guid     | .NET 9.0 | .NET 9.0 | set_Guid     | 46.2538 ns | 0.9178 ns | 0.9820 ns | 46.4311 ns |  0.88 | Faster           |    0.02 | No       | 0.0025 |      - |      32 B |        1.00 |
| Reflection_Set_Guid        | .NET 9.0 | .NET 9.0 | set_Guid     | 52.6969 ns | 0.5471 ns | 0.4272 ns | 52.7042 ns |  1.00 | Baseline         |    0.01 | Yes      | 0.0025 | 0.0001 |      32 B |        1.00 |
|                            |          |          |              |            |           |           |            |       |                  |         |          |        |        |           |             |
| No_Reflection_Set_Integer  | .NET 6.0 | .NET 6.0 | set_Integer  |  3.0751 ns | 0.0661 ns | 0.0586 ns |  3.0533 ns |  0.11 | Faster           |    0.00 | No       | 0.0019 |      - |      24 B |        1.00 |
| Reflection_Set_Integer     | .NET 6.0 | .NET 6.0 | set_Integer  | 29.2856 ns | 0.2454 ns | 0.2176 ns | 29.2994 ns |  1.00 | Baseline         |    0.01 | Yes      | 0.0019 |      - |      24 B |        1.00 |
|                            |          |          |              |            |           |           |            |       |                  |         |          |        |        |           |             |
| No_Reflection_Set_Integer  | .NET 7.0 | .NET 7.0 | set_Integer  |  2.8719 ns | 0.0600 ns | 0.0561 ns |  2.8517 ns |  0.09 | Faster           |    0.00 | No       | 0.0019 |      - |      24 B |        1.00 |
| Reflection_Set_Integer     | .NET 7.0 | .NET 7.0 | set_Integer  | 31.0332 ns | 0.2148 ns | 0.1904 ns | 31.0256 ns |  1.00 | Baseline         |    0.01 | Yes      | 0.0019 |      - |      24 B |        1.00 |
|                            |          |          |              |            |           |           |            |       |                  |         |          |        |        |           |             |
| No_Reflection_Set_Integer  | .NET 8.0 | .NET 8.0 | set_Integer  |  2.2463 ns | 0.0694 ns | 0.1566 ns |  2.2002 ns |  0.14 | Faster           |    0.01 | No       | 0.0019 |      - |      24 B |        1.00 |
| Reflection_Set_Integer     | .NET 8.0 | .NET 8.0 | set_Integer  | 15.9767 ns | 0.1931 ns | 0.1711 ns | 15.9541 ns |  1.00 | Baseline         |    0.01 | Yes      | 0.0019 |      - |      24 B |        1.00 |
|                            |          |          |              |            |           |           |            |       |                  |         |          |        |        |           |             |
| No_Reflection_Set_Integer  | .NET 9.0 | .NET 9.0 | set_Integer  |  1.6863 ns | 0.0343 ns | 0.0286 ns |  1.6905 ns |  0.12 | Faster           |    0.00 | No       | 0.0019 |      - |      24 B |        1.00 |
| Reflection_Set_Integer     | .NET 9.0 | .NET 9.0 | set_Integer  | 13.8870 ns | 0.2200 ns | 0.2058 ns | 13.7801 ns |  1.00 | Baseline         |    0.02 | Yes      | 0.0019 |      - |      24 B |        1.00 |
|                            |          |          |              |            |           |           |            |       |                  |         |          |        |        |           |             |
| No_Reflection_Set_String   | .NET 6.0 | .NET 6.0 | set_String   |  2.5325 ns | 0.0348 ns | 0.0271 ns |  2.5276 ns |  0.09 | Faster           |    0.00 | No       |      - |      - |         - |          NA |
| Reflection_Set_String      | .NET 6.0 | .NET 6.0 | set_String   | 27.9823 ns | 0.2807 ns | 0.2625 ns | 27.9616 ns |  1.00 | Baseline         |    0.01 | Yes      |      - |      - |         - |          NA |
|                            |          |          |              |            |           |           |            |       |                  |         |          |        |        |           |             |
| No_Reflection_Set_String   | .NET 7.0 | .NET 7.0 | set_String   |  2.2258 ns | 0.0443 ns | 0.0370 ns |  2.2150 ns |  0.08 | Faster           |    0.00 | No       |      - |      - |         - |          NA |
| Reflection_Set_String      | .NET 7.0 | .NET 7.0 | set_String   | 29.0430 ns | 0.2981 ns | 0.2642 ns | 29.0957 ns |  1.00 | Baseline         |    0.01 | Yes      |      - |      - |         - |          NA |
|                            |          |          |              |            |           |           |            |       |                  |         |          |        |        |           |             |
| No_Reflection_Set_String   | .NET 8.0 | .NET 8.0 | set_String   |  0.1275 ns | 0.0054 ns | 0.0048 ns |  0.1275 ns | 0.009 | Faster           |    0.00 | No       |      - |      - |         - |          NA |
| Reflection_Set_String      | .NET 8.0 | .NET 8.0 | set_String   | 14.5338 ns | 0.1411 ns | 0.1251 ns | 14.5411 ns | 1.000 | Baseline         |    0.01 | Yes      |      - |      - |         - |          NA |
|                            |          |          |              |            |           |           |            |       |                  |         |          |        |        |           |             |
| No_Reflection_Set_String   | .NET 9.0 | .NET 9.0 | set_String   |  0.1335 ns | 0.0022 ns | 0.0017 ns |  0.1331 ns |  0.01 | Faster           |    0.00 | No       |      - |      - |         - |          NA |
| Reflection_Set_String      | .NET 9.0 | .NET 9.0 | set_String   | 13.2370 ns | 0.1164 ns | 0.1089 ns | 13.2317 ns |  1.00 | Baseline         |    0.01 | Yes      |      - |      - |         - |          NA |

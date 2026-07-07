# AutoRefactor Experiment Reproduction Package

This directory is a lightweight package for reviewing and reproducing the paper experiments. It contains the fixed Java experimental dataset, source snapshots of the Java projects referenced by the dataset, and the per-sample result snapshots produced by the AutoRefactor and SWE-agent agent systems across multiple LLM backbones.

## Directory Layout

```text
dataset/java/                 Java experimental dataset snapshot
  delivery_schema/            Nine smell CSV files used by the main experiments
  source_tables/              Source table snapshots
repositories/java/            Source snapshots of the 12 referenced Java projects
results/                      Classic and agent result snapshots
metadata/                     Package manifest and project inventory
scripts/                      Package verification, path localization, and aggregation scripts
```

## Included Contents

- Java delivery dataset: 691 samples across 9 smell categories used by the main experiments.
- Java project sources: 12 projects referenced by the dataset `project_path` column, plus `repositories/java/Arc` as Mindustry's local composite-build dependency.
- Per-sample results: AutoRefactor and SWE-agent result CSVs across the evaluated LLM backbones, plus the aggregated RQ3 table under `results/`.
- Project source snapshots exclude build artifacts such as `.git/`, `.gradle/`, `build/`, `target/`, and `out/`.

## Provenance

The agent harness used to drive the AutoRefactor runs is proprietary tooling and is not included in this package. Each per-sample result row carries a `result_source` field that records the originating internal run path (expressed under the `${EXTENSION_DEVELOP_ROOT}` environment variable) for traceability.

## Excluded Contents

- No API keys, model credentials, or authentication files are included.
- No Docker image tarball is included.
- No large runtime payloads are included, such as Maven/Gradle offline caches, JDKs, or IDEA distributions.

## Verify The Package

Run from this directory:

```bash
python3 scripts/verify_package.py
```

The expected output should include:

```text
dataset rows: 691
projects referenced: 12
missing project dirs: 0
```

## Generate A Localized Dataset

The original CSV files keep the absolute `project_path` values from the collection machine. After moving this package, generate a localized dataset before running local commands:

```bash
python3 scripts/prepare_local_dataset.py
```

The script creates:

```text
work/dataset-local/delivery_schema/*.csv
work/dataset-local/source_tables/*.csv
```

In those generated CSV files, `project_path` is rewritten to an absolute path under the current package, for example:

```text
<package-root>/repositories/java/Mindustry-v154.3
```

## Dataset Entry Point

The main experimental dataset is located at:

```text
dataset/java/delivery_schema/
```

Current smell CSV files:

```text
code_clone_type1.csv
data_clumps.csv
feature_envy.csv
long_method.csv
long_parameter_list.csv
mysterious_name.csv
nested_complexity.csv
refused_bequest.csv
switch_statements.csv
```

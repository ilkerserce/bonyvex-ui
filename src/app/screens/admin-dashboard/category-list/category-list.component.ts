import { Component, OnInit, OnDestroy } from '@angular/core';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CategoriesService } from 'src/app/services/categories.service';

interface TreeNode {
  id: number;
  nameTR: string;
  parent_id?: number;
  children?: TreeNode[]; // Yeni özellik: alt kategoriler
  level?: number;
  expandable: boolean;
}


@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit, OnDestroy {
  private destroy$: Subject<boolean> = new Subject<boolean>();

  dataSource: MatTreeFlatDataSource<TreeNode, TreeNode>;
  treeControl: FlatTreeControl<TreeNode>;
  treeFlattener: MatTreeFlattener<TreeNode, TreeNode>;

  constructor(private categoriesService: CategoriesService) { }

  ngOnInit() {
    this.treeControl = new FlatTreeControl<TreeNode>(
      node => node.level,
      node => node.expandable
    );

    this.treeFlattener = new MatTreeFlattener<TreeNode, TreeNode>(
      this.transformer,
      node => node.level,
      node => node.expandable,
      node => node.children
    );

    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

    this.fetchPrimaryCategories();
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  fetchPrimaryCategories() {
    this.categoriesService.getCategories()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: res => {
          const primaryCategories = res['primaryCategories'];
          const secondaryCategories = res['secondaryCategories'];
  
          // Alt kategorileri birincil kategorilere eşleştirme
          primaryCategories.forEach(category => {
            category.children = secondaryCategories.filter(subCategory => subCategory.parent_id === category.id);
          });
  
          this.dataSource.data = primaryCategories;
        },
        error: err => {
  
        }
      });
  }
  

  hasChild = (_: number, node: TreeNode) => !!node.children && node.children.length > 0;

  private transformer = (node: TreeNode, level: number) => {
    return {
      ...node,
      level,
      expandable: !!node.children && node.children.length > 0
    };
  };

  editCategory(node: TreeNode) {
    // Düzenleme işlevi
    // Seçilen kategorinin düzenleme işlemlerini burada gerçekleştir
    console.log('Düzenle:', node);
  }

  deleteCategory(node: TreeNode) {
    // Silme işlevi
    // Seçilen kategoriyi silme işlemlerini burada gerçekleştir
    console.log('Sil:', node);
  }

}

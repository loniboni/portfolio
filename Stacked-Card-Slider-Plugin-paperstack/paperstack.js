(function($) {
    $.fn.visible = function(visible) {
        if (visible) {
            this.show();
        } else {
            this.hide();
        }
    };

    $.fn.paperstack = function(options) {
        this.sheets = this.children();
        this.currentPage = 0;
        
        this.nextBtn = $(options.next);
        this.prevBtn = $(options.prev);

        this.next = () => {
            console.log('Before next:', { currentPage: this.currentPage, sheetOrder: this.sheetOrder });
            const bottomSheet = this.sheetOrder[this.sheets.length - 1]; // Bottom sheet before moving
            this.currentPage = (this.currentPage + 1) % this.sheets.length; // Wrap currentPage to stay within bounds
            this.sheetOrder.unshift(this.sheetOrder.pop()); // Move the first sheet to the end
            console.log('Updated sheetOrder:', this.sheetOrder);
            this._changePage('next', bottomSheet);
            console.log('After next:', { currentPage: this.currentPage, sheetOrder: this.sheetOrder });
        };

        this.previous = () => {
            console.log('Before previous:', { currentPage: this.currentPage, sheetOrder: this.sheetOrder });
            const currentTopSheet = this.sheetOrder[0]; // Top sheet before moving
            this.currentPage = (this.currentPage - 1 + this.sheets.length) % this.sheets.length; // Wrap currentPage to stay within bounds
            this.sheetOrder.push(this.sheetOrder.shift()); // Move the last sheet to the front
            console.log('Updated sheetOrder:', this.sheetOrder);
            this._changePage('prev', currentTopSheet);
            console.log('After previous:', { currentPage: this.currentPage, sheetOrder: this.sheetOrder });
        };
        
        this.nextBtn.click(this.next);
        this.prevBtn.click(this.previous);

        this.setPage = function(pageNum) {
            if (pageNum > this.sheets.length) {
                pageNum = this.sheets.length;
            } else if (pageNum < 0) {
                pageNum = 0;
            }

            let diff = pageNum - this.currentPage;
            let func = diff > 0 ? this.next : this.previous;

            let counter = 0;
            let interval = setInterval(() => {
                func();
                if (++counter > Math.abs(diff)) {
                    clearInterval(interval);
                }
            }, 100);
        };

        this._changePage = (source, animatedSheetIndex) => {
            let toMove = $(this.sheets[animatedSheetIndex]); // Use the provided sheet index for animation

            console.log('Animating sheet:', toMove);

            if (toMove) {
                const direction = source === 'next' ? '120%' : '-120%';
                toMove.css('left', direction);
                toMove.css('z-index', this.sheets.length + 1);
                setTimeout(() => {
                    toMove.css('left', '0');
                    this._arrangeSheets(source);
                }, 300);
            } else {
                this._arrangeSheets(source);
            }
        };

        this._arrangeSheets = (source) => {
            // Predefined rotation angles for messy paper pile effect - more dramatic
            const rotationAngles = [-8, 5, -12, 3, -6, 9, -4, 11, -7, 6];
            
            for (let i = 0; i < this.sheets.length; i++) {
                let sheet = $(this.sheets[this.sheetOrder[i]]); // Use sheetOrder to determine the correct sheet

                // Update z-index based on position in the stack
                sheet.css('z-index', this.sheets.length - i);

                // Apply small varied rotations for messy paper pile effect
                if (i === 0) {
                    // Top sheet - no rotation
                    sheet.css('transform', 'rotate(0deg)');
                } else {
                    // Background sheets get small varied rotations
                    const rotation = rotationAngles[i % rotationAngles.length];
                    sheet.css('transform', `rotate(${rotation}deg)`);
                }
            }

            // Ensure the top sheet is perfectly aligned
            $(this.sheets[this.sheetOrder[0]]).css('transform', 'rotate(0deg)');
        };

        this.sheetOrder = Array.from(Array(this.sheets.length).keys());
        console.log('Initializing paperstack:', {
            totalSheets: this.sheets.length,
            sheetOrder: this.sheetOrder
        });
        this._changePage('initial');

        return this;
    };

}(jQuery));